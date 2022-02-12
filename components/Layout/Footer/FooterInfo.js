import React from "react";
import styled from "styled-components";

const FooterInfo = ({ title, items }) => {
  return (
    <FooterInfoWrapper>
      <TextTitle>{title}</TextTitle>
      <ListItems>
        {items.map((item, i) => (
          <Item key={i}>{item}</Item>
        ))}
      </ListItems>
    </FooterInfoWrapper>
  );
};

export default FooterInfo;

const FooterInfoWrapper = styled.div``;
const TextTitle = styled.h1`
  color: ${({ theme }) => theme.text.secondary};
`;
const ListItems = styled.ul`
  text-align: center;
  line-height: 1.8;
`;
const Item = styled.li``;
