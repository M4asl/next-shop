import React from "react";
import styled from "styled-components";
import ReviewForm from "./ReviewForm";
import Review from "./Review";
import { useSelector } from "react-redux";

const ReviewsList = () => {
  const { productDetails, loading } = useSelector(
    (state) => state.productDetails
  );
  const { rating, reviews } = productDetails;
  return (
    <ReviewListWrapper>
      <ReviewHeader>Reviews</ReviewHeader>
      <ReviewForm />
      {reviews.map((review) => (
        <Review key={review._id} review={review} />
      ))}
    </ReviewListWrapper>
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
`;

const ReviewHeader = styled.h1`
  border-bottom: 3px solid ${({ theme }) => theme.text.primary};
`;
