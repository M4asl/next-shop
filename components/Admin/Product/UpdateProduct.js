import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Image from "next/image";
import { lightTheme } from "../../../styles/default";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { AiOutlineCloseCircle, AiOutlineClose } from "react-icons/ai";
import {
  updateProduct,
  getProductDetails,
} from "../../../redux/actions/productActions";
import { IconContext } from "react-icons/lib";

const UpdateProduct = ({ closeModalUpdate }) => {
  const {
    loading: productDetailsLoading,
    error: productDetailsError,
    productDetails,
  } = useSelector((state) => state.productDetails);
  const { loading, error, product, success } = useSelector(
    (state) => state.updateProduct
  );

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(1);
  const [countInStock, setCountInStock] = useState(0);

  const [textAreaCount, setTextAreaCount] = useState(0);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (productDetails && productDetails._id !== id) {
      dispatch(getProductDetails("", id));
    } else {
      setName(productDetails.name);
      setBrand(productDetails.brand);
      setOldImages(productDetails.images);
      setCategory(productDetails.category);
      setDescription(productDetails.description);
      setPrice(productDetails.price);
      setCountInStock(productDetails.countInStock);
      setTextAreaCount(productDetails.description.length);
    }

    if (error) {
      toast.error(error);
    }

    if (productDetailsError) {
      toast.productDetailsError(error);
    }

    if (success) {
      router.push("/products");
    }
  }, [dispatch, error, productDetailsError, success, productDetails, id]);

  const submitHandler = (e) => {
    e.preventDefault();

    const productData = {
      name,
      brand,
      images,
      category,
      description,
      price: Number(price),
      countInStock: Number(countInStock),
    };

    if (price < 1 || countInStock < 0)
      return toast.error("The entered value cannot be negative.");

    if (images.length === 0) return toast.error("Please upload images.");

    if (images.length > 5) return toast.error("Max length images is 5.");
    console.log(productData);
    dispatch(updateProduct(productData, id));
  };

  const calculateCharacters = (e) => {
    setTextAreaCount(e.target.value.length);
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setOldImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((oldArray) => [...oldArray, reader.result]);
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const deleteImage = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
    setImagesPreview(newArr);
  };

  return (
    <CreateProductWrapper>
      <FormContainer onSubmit={submitHandler}>
        {loading && <h1>LOADING</h1>}
        <Title>Update product</Title>
        <div
          onClick={() => closeModalUpdate()}
          style={{
            color: "white",
            top: "1%",
            left: "89%",
            fontSize: "4rem",
            position: "absolute",
          }}
        >
          <IconContext.Provider value={{ size: "20px" }}>
            <AiOutlineClose />
          </IconContext.Provider>
        </div>
        <FormGroup>
          <Label htmlFor="name_field">Name</Label>
          <StyledInput
            type="text"
            id="name_field"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="brand_field">Brand</Label>
          <StyledInput
            type="text"
            id="brand_field"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="category_field">Category</Label>
          <StyledInput
            type="text"
            id="category_field"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="description_field">
            Description
            <TextCount>{textAreaCount} / 1000</TextCount>
          </Label>

          <TextArea
            type="text"
            id="description_field"
            value={description}
            maxLength={1000}
            onChange={(e) => {
              calculateCharacters(e);
              setDescription(e.target.value);
            }}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="price_field">Price</Label>
          <StyledInput
            type="number"
            id="price_field"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="count_in_stock_field">Count in stock</Label>
          <StyledInput
            type="number"
            id="count_in_stock_field"
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
          />
        </FormGroup>

        <FormGroupFile>
          <Label htmlFor="images_field">Images</Label>
          <StyledInputFile
            type="file"
            id="images_field"
            onChange={onChange}
            multiple
          />
        </FormGroupFile>
        <Button>{loading ? "LOADING" : "Update"}</Button>
        <ImagesWrapper>
          {imagesPreview.map((img, i) => (
            <ImageWrapper key={i}>
              <Image
                src={img.url || img}
                alt="Images Preview"
                width="150"
                height="150"
                className="image"
                onClick={() => deleteImage(i)}
              />
              <DeleteImageIcon onClick={() => deleteImage(i)}>
                <IconContext.Provider value={{ size: "20px" }}>
                  <AiOutlineCloseCircle />
                </IconContext.Provider>
              </DeleteImageIcon>
            </ImageWrapper>
          ))}
        </ImagesWrapper>
      </FormContainer>
    </CreateProductWrapper>
  );
};

const CreateProductWrapper = styled.div`
  width: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Title = styled.h1`
  margin: 0;
`;

const FormContainer = styled.form`
  width: 500px;
  // height: 90%;
  // overflow-y: scroll;
  padding: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  // justify-content: space-between;
  border-radius: 30px;
  background-color: black;
  border: 2px solid ${({ theme }) => theme.text.secondary};
`;

const FormGroup = styled.div`
  width: 400px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  font-size: 2rem;
  margin-bottom: 10px;
  align-self: start;
`;

const FormGroupFile = styled.div`
  width: 400px;
  margin: 10px;
  display: flex;
  justify-content: space-between;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 20px;
  background-color: ${lightTheme.bg.background};
  &:hover {
    border-radius: 20px;
    border: 2px solid ${({ theme }) => theme.text.secondary};
  }
  &:active &:focus {
    border-radius: 20px;
    border: 2px solid ${({ theme }) => theme.text.secondary};
  }
`;

const TextArea = styled.textarea`
  width: 400px;
  height: 100px;
  padding: 10px;
  border-radius: 20px;
  border: 2px solid ${({ theme }) => theme.text.secondary};
  resize: none;
  background-color: white;
`;

const StyledInputFile = styled.input`
  width: 300px;
`;

const ImagesWrapper = styled.div`
  width: 100%;
  height: 200px;
  overflow-y: scroll;
  margin: 0 auto;
  margin-top: 30px;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const ImageWrapper = styled.div`
  width: 150px;
  height: 160px;
  overflow: hidden;
`;

const Button = styled.button`
  width: 180px;
  height: 40px;
  background: transparent;
  border: 2px solid ${({ theme }) => theme.text.secondary};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.text.secondary};
`;

const DeleteImageIcon = styled.span`
  font-size: 4rem;
  color: ${lightTheme.text.primary};
  position: relative;
  left: 35%;
  top: -97%;
`;

const TextCount = styled.p`
  color: ${({ theme }) => theme.text.primary};
`;

export default UpdateProduct;
