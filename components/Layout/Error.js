import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { BsFillCartCheckFill } from "react-icons/bs";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Error = ({ children }) => {
  return (
    <ErrorWrapper>
      <h1>{children}</h1>
      <ImageWrapper>
        <Image
          src="/page_not_found.svg"
          alt="Page not found"
          blurDataURL="/page_not_found.svg"
          placeholder="blur"
          layout="fill"
          className={"image"}
        />
      </ImageWrapper>

      <TextLink>
        <AiOutlineArrowLeft />
        <Link href="/products" passHref>
          Back to products
        </Link>
        <BsFillCartCheckFill />
      </TextLink>
    </ErrorWrapper>
  );
};

export default Error;

const ErrorWrapper = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImageWrapper = styled.div`
  width: 300px;
  height: 300px;
  position: relative;
`;

const TextLink = styled.h1`
  display: flex;
  justify-content: center;
  letter-spacing: 0.2rem;
  color: ${({ theme }) => theme.text.secondary};

  a {
    color: ${({ theme }) => theme.text.primary};
  }
`;
