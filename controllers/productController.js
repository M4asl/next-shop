import Product from "../models/productModel.js";
import cloudinary from "cloudinary";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/AppError";
import APIFeatures from "../utils/apiFeatures";

// Setting up cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getProducts = catchAsync(async (req, res, next) => {
  const resPerPage = 9;

  const productsCount = await Product.countDocuments();

  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .sort();

  let products = await apiFeatures.query;

  if (req.query.minPriceVal && req.query.maxPriceVal) {
    apiFeatures.rangeFilter();
    products = await apiFeatures.query.clone();
  }

  let filteredProductsCount = products.length;

  apiFeatures.pagination(resPerPage);
  products = await apiFeatures.query.clone();

  res.json({
    page: Number(req.query.page),
    pages: Math.ceil(filteredProductsCount / resPerPage),
    productsCount,
    resPerPage,
    filteredProductsCount,
    products,
  });
});

const getProductById = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.query.id).populate(
    "reviews.user",
    "_id email"
  );

  if (!product) {
    return next(new AppError("Product not found.", 404));
  }

  res.status(200).json(product);
});

const deleteProduct = catchAsync(async (req, res) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new AppError("Product not found with this ID", 404));
  }

  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product is deleted.",
  });
});

const createProduct = catchAsync(async (req, res) => {
  const {
    name,
    price,
    images,
    brand,
    category,
    countInStock,
    numReviews,
    description,
  } = req.body;

  let imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "ApplyShopProducts/products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;

  const product = new Product({
    name,
    price,
    images: imagesLinks,
    brand,
    category,
    countInStock,
    numReviews,
    description,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

const updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new AppError("Product not found.", 404));
  }

  if (req.body.images) {
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    let imagesLinks = [];
    const images = req.body.images;
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "ApplyShopProducts/products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.query.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.json(updatedProduct);
});

const createProductReview = catchAsync(async (req, res, next) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new AppError("Product not found.", 404));
  }

  const alreadyReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (alreadyReviewed) {
    return next(new AppError("Product already reviewed", 400));
  }

  const review = {
    rating: Number(rating),
    comment,
    user: req.user._id,
  };

  product.reviews.push(review);

  product.numReviews = product.reviews.length;

  product.rating =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save();
  res.status(201).json(product);
});

const listCategories = catchAsync(async (req, res) => {
  const categories = await Product.distinct("category", {});

  res.json(categories);
});

const getTopProducts = catchAsync(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(5);

  res.json(products);
});

const getLastestProducts = catchAsync(async (req, res) => {
  const products = await Product.find({}).sort("-createdAt").limit(5);

  res.json(products);
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  listCategories,
  getTopProducts,
  getLastestProducts,
};
