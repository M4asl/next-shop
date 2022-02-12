import React from "react";
import styled from "styled-components";
import FooterInfo from "./FooterInfo";
import useMediaQuery from "../../../hooks/useMediaQuery";

const AboutUs = ["About Us", "Community", "Jobs", "Shipping", "Contact Us"];
const OurServices = [
  "Free Shipping",
  "Free Returns",
  "Our Franchising",
  "Terms & Conditions",
  "Privacy Policy",
];
const Information = [
  "Payment methods",
  "Shipping methods",
  "Product Returns",
  "Conformity of the products",
  "Delivery & Shipping",
];

const Footer = () => {
  const isMobile = useMediaQuery("(max-width: 1024px)");
  return (
    <>
      {!isMobile && (
        <FooterWrapper>
          <FooterInfo title={"About Us"} items={AboutUs} />
          <FooterInfo title={"Our Services"} items={OurServices} />
          <FooterInfo title={"Information"} items={Information} />
        </FooterWrapper>
      )}
    </>
  );
};

export default Footer;

const FooterWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px;
  border-top: 2px solid ${({ theme }) => theme.text.primary};
`;
