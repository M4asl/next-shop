import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { lightTheme } from "../../styles/default";
import { BsCartPlus } from "react-icons/bs";
import { useRouter } from "next/dist/client/router";
import Pagination from "react-js-pagination";
import FilterProducts from "../../components/Products/FilterProducts";
import Error from "../../components/Layout/Error";
import { addToCart } from "../../redux/actions/cartActions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { IconContext } from "react-icons/lib";
import Loader from "../Layout/Loader";

const Products = ({ role }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { query } = router;
  let { page = 1 } = query;
  page = Number(page);

  const { productList, error, loading } = useSelector(
    (state) => state.productList
  );
  const { products, productsCount, resPerPage, filteredProductsCount } =
    productList;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handlePagination = (pageNumber) => {
    let link = "";
    if (query.search) link = link.concat(`&search=${query.search}`);
    if (query.category) link = link.concat(`&category=${query.category}`);
    if (query.sort) link = link.concat(`&sort=${query.sort}`);

    if (query.search || query.category || query.sort) {
      router.push(
        role === "admin"
          ? `/admin/products?page=${pageNumber}${link}`
          : `/products?page=${pageNumber}${link}`
      );
    } else {
      router.push(
        role === "admin"
          ? `/admin/products/?page=${pageNumber}`
          : `products/?page=${pageNumber}`
      );
    }
  };

  let count = productsCount;
  if (query.search || query.category || query.sort) {
    count = filteredProductsCount;
  }

  const addToCartHandler = (id, qty = 1) => {
    if (cartItems.length > 12) {
      toast.error("Maximum cart size is 13 products.");
    }
    if (cartItems.length < 13) {
      dispatch(addToCart(id, qty));
      toast.success("The product has been added.");
    }
  };

  return (
    <ProductsContainer>
      <FilterProducts />
      {resPerPage < count && (
        <Pagination
          activePage={page}
          itemsCountPerPage={resPerPage}
          totalItemsCount={filteredProductsCount}
          onChange={handlePagination}
          nextPageText={"Next"}
          prevPageText={"Prev"}
          firstPageText={"First"}
          lastPageText={"Last"}
          itemClass="page-item"
          linkClass="page-link"
          activeClass="page-item-active"
        />
      )}
      <ProductsWrapper>
        {products.length > 0 ? (
          products.map((product) => (
            <Product key={product._id}>
              <HeaderProduct>
                <Link
                  href={
                    role === "admin"
                      ? `/admin/products/${product._id}`
                      : `/products/${product._id}`
                  }
                >
                  {product.name.substring(0, 30)}
                </Link>
              </HeaderProduct>
              <ImageContainer>
                <Image
                  src={product.images[0].url}
                  alt={product.name}
                  blurDataURL={product.images[0].url}
                  placeholder="blur"
                  layout="fill"
                />
              </ImageContainer>
              <BottomContainer>
                <ProductPrice>{product.price}$</ProductPrice>
                <Button onClick={() => addToCartHandler(product._id)}>
                  Add to cart
                  <IconContext.Provider value={{ size: "20px" }}>
                    <BsCartPlus />
                  </IconContext.Provider>
                </Button>
              </BottomContainer>
            </Product>
          ))
        ) : (
          <Error>Products not found</Error>
        )}
      </ProductsWrapper>
      {resPerPage < count && (
        <Pagination
          activePage={page}
          itemsCountPerPage={resPerPage}
          totalItemsCount={filteredProductsCount}
          onChange={handlePagination}
          nextPageText={"Next"}
          prevPageText={"Prev"}
          firstPageText={"First"}
          lastPageText={"Last"}
          itemClass="page-item"
          linkClass="page-link"
          activeClass="page-item-active"
        />
      )}
      {loading && <Loader />}
    </ProductsContainer>
  );
};

export default Products;

const ProductsContainer = styled.div`
  width: 80%;
  margin: 0px auto;
  padding-top: 75px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media only ${({ theme }) => theme.breakpoints.xs} {
    width: 300px;
  }
  .pagination {
    width: 450px;
    height: 40px;
    display: flex;
    justify-content: space-between;
    margin: 20px 0px;
    @media only ${({ theme }) => theme.breakpoints.sm} {
      width: 280px;
    }
  }
  .page-item {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.text.primary};
    border-radius: 10px;
    border: none;
    @media only ${({ theme }) => theme.breakpoints.sm} {
      width: 35px;
      height: 35px;
    }
  }
  .page-item-active {
    background-color: ${({ theme }) => theme.text.secondary};
  }
  .page-link {
    color: ${({ theme }) => theme.bg.background};
    font-weight: 500;
    font-size: 1.5rem;
  }
`;

const ProductsWrapper = styled.div`
  max-width: 1020px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Product = styled.div`
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: #e8e9eb;
  border-radius: 20px;
  margin: 20px;
  padding: 10px;
  color: ${lightTheme.text.primary};
  text-align: center;
  @media only ${({ theme }) => theme.breakpoints.xs} {
    width: 250px;
    height: 250px;
    margin: 20px 0px;
  }
`;

const HeaderProduct = styled.div`
  max-height: 30%;
  text-align: center;
  font-size: 1.7rem;
  font-weight: bold;
  a {
    color: ${({ theme }) => theme.text.secondary};
  }
`;

const ImageContainer = styled.div`
  width: 180px;
  height: 180px;
  margin: 10px 0px;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  @media only ${({ theme }) => theme.breakpoints.xs} {
    width: 120px;
    height: 120px;
  }
`;

const BottomContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const ProductPrice = styled.span`
  font-size: 1.9rem;
`;

const Button = styled.button`
  width: 125px;
  padding: 8px 2px;
  font-weight: 500;
  color: ${({ theme }) => theme.information.success};
  border-radius: 20px;
  background-color: white;
  border: 2px solid ${({ theme }) => theme.text.primary};
`;
