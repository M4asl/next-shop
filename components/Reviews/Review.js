import React from "react";
import Rating from "./Rating";
import styled from "styled-components";
import { HiOutlineUserCircle } from "react-icons/hi";
import Moment from "react-moment";
import { IconContext } from "react-icons/lib";

const ReviewList = ({ review }) => {
  return (
    <>
      <ReviewContainer>
        <LeftContainer>
          <Avatar>
            <IconContext.Provider>
              <HiOutlineUserCircle />
            </IconContext.Provider>
          </Avatar>
          <ProfileName>Name</ProfileName>
        </LeftContainer>
        <RightContainer>
          <TopContainer>
            <Rating value={review.rating} />
            <Moment format="HH:MM / D MMM YYYY" withTitle>
              {review.created}
            </Moment>
          </TopContainer>
          <Comment>{review.comment}</Comment>
        </RightContainer>
      </ReviewContainer>
    </>
  );
};

export default ReviewList;

const ReviewContainer = styled.div`
  width: 1000px;
  margin-top: 100px;
  padding: 20px;
  border-top: 2px solid ${({ theme }) => theme.text.primary};
  display: flex;
  justify-content: space-between;
  &:last-child {
    border-bottom: 2px solid ${({ theme }) => theme.text.primary};
    margin-bottom: 100px;
  }
`;

const LeftContainer = styled.div`
  width: 20%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const Avatar = styled.div`
  font-size: 4rem;
`;

const ProfileName = styled.div`
  font-size: 2rem;
`;

const RightContainer = styled.div`
  width: 70%;
`;

const TopContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 15px 0px;
`;

const Time = styled.div``;

const Comment = styled.div`
  line-height: 2;
`;
