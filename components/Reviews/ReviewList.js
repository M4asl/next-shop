import React, { useEffect } from "react";
import styled from "styled-components";
import ReviewForm from "./ReviewForm";
import Review from "./Review";
import { useSelector } from "react-redux";
import Loader from "../Layout/Loader";
import { toast } from "react-toastify";

const ReviewsList = () => {
  const { productDetails, loading, error } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const { rating, reviews } = productDetails;
  return (
    <>
      <ReviewListWrapper>
        <ReviewHeader>Reviews</ReviewHeader>
        <ReviewForm />
        {reviews.map((review) => (
          <Review key={review._id} review={review} />
        ))}
      </ReviewListWrapper>
      {loading && <Loader />}
    </>
  );
};

export default ReviewsList;

const ReviewListWrapper = styled.div`
  width: 100%;
  margin: 30px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media only ${({ theme }) => theme.breakpoints.lg} {
    width: 80%;
    margin: 30px auto;
  }
  @media only ${({ theme }) => theme.breakpoints.sm} {
    width: 90%;
    margin: 20px auto;
  }
`;

const ReviewHeader = styled.h1`
  border-bottom: 3px solid ${({ theme }) => theme.text.primary};
`;
