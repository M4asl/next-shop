import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { createProduct } from "../../../redux/actions/productActions";
import Image from "next/image";
import { lightTheme } from "../../../styles/default";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import Loader from "../../Layout/Loader";

const NewProduct = () => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(1);
  const [countInStock, setCountInStock] = useState(0);
  const [numReviews, setNumReviews] = useState(0);

  const [textAreaCount, setTextAreaCount] = useState(0);
  const [imagesPreview, setImagesPreview] = useState([]);

  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, error, success, product } = useSelector(
    (state) => state.createProduct
  );

  toast.configure();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    if (success) {
      router.push(`/products/${product._id}`);
    }
  }, [dispatch, error, success]);

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
      numReviews: Number(numReviews),
    };

    if (price < 1 || countInStock < 0 || numReviews < 0)
      return toast.error("The entered value cannot be negative.");

    if (images.length === 0) return toast.error("Please upload images.");

    if (images.length > 5) return toast.error("Max length images is 5.");
    dispatch(createProduct(productData));
  };

  const calculateCharacters = (e) => {
    setTextAreaCount(e.target.value.length);
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
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
        <h1>Create product</h1>
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

        <FormGroup>
          <Label htmlFor="num_reviews_field">Num reviews</Label>
          <StyledInput
            type="number"
            id="num_reviews_field"
            value={numReviews}
            onChange={(e) => setNumReviews(e.target.value)}
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
        <Button type="submit">{loading ? <Loader /> : "CREATE"}</Button>
      </FormContainer>
      <ImagesWrapper>
        {imagesPreview.map((img, i) => (
          <div key={i}>
            <Image
              src={img}
              key={img}
              alt="Images Preview"
              width="150"
              height="150"
              className="image"
            />
            <DeleteImageIcon onClick={() => deleteImage(i)}>
              <IconContext.Provider value={{ size: "20px" }}>
                <AiOutlineCloseCircle />
              </IconContext.Provider>
            </DeleteImageIcon>
          </div>
        ))}
      </ImagesWrapper>
    </CreateProductWrapper>
  );
};

const CreateProductWrapper = styled.div`
  width: 100%;
  padding: 75px;
  position: relative;
  @media only ${({ theme }) => theme.breakpoints.sm} {
    padding: 50px 0px;
  }
`;

const FormContainer = styled.form`
  width: 500px;
  height: 100%;
  padding: 15px;
  display: flex;
  margin: 0 auto;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;
  border-radius: 30px;
  border: 2px solid ${({ theme }) => theme.text.secondary};
  @media only ${({ theme }) => theme.breakpoints.sm} {
    width: 300px;
    margin: 0 auto;
  }
`;

const FormGroup = styled.div`
  width: 400px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media only ${({ theme }) => theme.breakpoints.sm} {
    width: 200px;
  }
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
  @media only ${({ theme }) => theme.breakpoints.sm} {
    width: 200px;
  }
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
  @media only ${({ theme }) => theme.breakpoints.sm} {
    width: 200px;
  }
`;

const TextArea = styled.textarea`
  width: 400px;
  height: 150px;
  padding: 10px;
  border-radius: 20px;
  border: 2px solid ${({ theme }) => theme.text.secondary};
  resize: none;
  background-color: white;
  @media only ${({ theme }) => theme.breakpoints.sm} {
    width: 200px;
  }
`;

const StyledInputFile = styled.input`
  width: 300px;
  @media only ${({ theme }) => theme.breakpoints.sm} {
    width: 200px;
  }
`;

const ImagesWrapper = styled.div`
  max-height: 300px;
  margin: 0 auto;
  margin-top: 30px;
  overflow-y: scroll;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  span {
    margin-top: 10px !important;
  }
`;

const Button = styled.button`
  width: 180px;
  height: 35px;
  background: transparent;
  border: 2px solid ${({ theme }) => theme.text.secondary};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.text.secondary};
`;

const DeleteImageIcon = styled.span`
  font-size: 3rem;
  color: ${lightTheme.text.primary};
  position: relative;
  left: -17%;
  top: -73%;
`;

const TextCount = styled.p`
  color: ${({ theme }) => theme.text.primary};
`;

export default NewProduct;
