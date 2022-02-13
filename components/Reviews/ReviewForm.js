import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { MdOutlineRateReview } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { createReviewProduct } from "../../redux/actions/productActions";
import { toast } from "react-toastify";
import { clearErrors } from "../../redux/actions/globalActions";
import { IconContext } from "react-icons/lib";

const ReviewForm = () => {
  const router = useRouter();
  const { id } = router.query;
  const [values, setValues] = useState({
    rating: 1,
    comment: "",
  });
  const [textAreaCount, setTextAreaCount] = useState(0);

  const dispatch = useDispatch();
  const { productDetails, loading, error } = useSelector(
    (state) => state.createProductReview
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
      setValues({
        rating: 1,
        comment: "",
      });
      setTextAreaCount(0);
    }
  }, [dispatch, error]);

  const calculateCharacters = (e) => {
    setTextAreaCount(e.target.value.length);
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const addReview = (e) => {
    e.preventDefault();
    console.log(values);
    dispatch(createReviewProduct(id, values.rating, values.comment));
    setValues({ rating: 1, comment: "" });
  };

  return (
    <>
      <Form onSubmit={addReview}>
        <FormGroup>
          <Label htmlFor="comment_field">
            Comment
            <TextCount>{textAreaCount} / 250</TextCount>
          </Label>
          <TextArea
            type="text"
            placeholder="Comment"
            id="comment_field"
            maxLength={250}
            value={values.comment}
            onChange={(e) => {
              calculateCharacters(e);
              handleChange("comment")(e);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="review_rating">Rating</Label>
          <Select
            name="Rating"
            id="review_rating"
            value={values.rating}
            onChange={handleChange("rating")}
          >
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </Select>
          <Button>
            Add review
            <IconContext.Provider>
              <MdOutlineRateReview style={{ marginLeft: "5px" }} />
            </IconContext.Provider>
          </Button>
        </FormGroup>
      </Form>
    </>
  );
};

export default ReviewForm;

const Form = styled.form`
  width: 1000px;
  display: flex;
  justify-content: space-between;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text.secondary};
`;

const Label = styled.label`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const TextCount = styled.p`
  color: ${({ theme }) => theme.text.primary};
`;

const TextArea = styled.textarea`
  width: 300px;
  height: 150px;
  padding: 10px;
  border-radius: 20px;
  border: 2px solid ${({ theme }) => theme.text.secondary};
  resize: none;
  background-color: white;
`;
const Select = styled.select`
  padding: 10px;
  border-radius: 20px;
  background-color: white;
  border: 2px solid ${({ theme }) => theme.text.secondary};
  &:active {
    border: 2px solid ${({ theme }) => theme.information.warning};
  }
  &:focus {
    border: 2px solid ${({ theme }) => theme.information.warning};
  }
`;

const Button = styled.button`
  width: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  padding: 10px 0px;
  font-weight: 500;
  color: ${({ theme }) => theme.information.success};
  border-radius: 20px;
  background-color: white;
  border: 2px solid ${({ theme }) => theme.text.primary};
`;
