import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import Link from "next/link";
import OrderProductList from "../../components/Order/OrderProductList";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { IconContext } from "react-icons/lib";

const OrdersList = ({ orders, roleType }) => {
  const [selected, setSelected] = useState(null);
  const [role, setRole] = useState(roleType);

  const toggle = (id) => {
    if (selected === id) {
      return setSelected(null);
    }
    setSelected(id);
  };
  return (
    <OrderListWrapper>
      <OrderTitle>Orders</OrderTitle>
      {orders.map((item) => (
        <Order key={item._id} onClick={() => toggle(item._id.toString())}>
          <OrderTopContainer>
            <OrderNumber>
              Order number:{" "}
              <Link
                href={
                  role === "admin"
                    ? `/admin/orders/${item._id}`
                    : `/orders/${item._id}`
                }
              >
                {item._id}
              </Link>
            </OrderNumber>
            <OrderPriceContainer>
              <OrderTaxPrice>
                <OrderNamePrice>Tax:</OrderNamePrice> {item.taxPrice}$
              </OrderTaxPrice>
              <OrderTotalPrice>
                <OrderNamePrice>Total price:</OrderNamePrice> {item.totalPrice}$
              </OrderTotalPrice>
              {selected === item._id ? (
                <IconContext.Provider>
                  <AiOutlineMinus style={{ fontSize: "2.5rem" }} />
                </IconContext.Provider>
              ) : (
                <IconContext.Provider>
                  <AiOutlinePlus style={{ fontSize: "2.5rem" }} />
                </IconContext.Provider>
              )}
            </OrderPriceContainer>
          </OrderTopContainer>
          <AnimatePresence>
            {selected === item._id && (
              <OrderBottomContainer
                style={{ overflow: "hidden" }}
                initial={{ opacity: 0, height: "0" }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: "0" }}
                transition={{ type: "easeIn", duration: 1 }}
              >
                <OrderDetailsWrapper>
                  <PersonalDetailsWrapper>
                    <ListItem>
                      <ItemList>Email: {item.personalDetails.email}</ItemList>
                      <ItemList>
                        First name: {item.personalDetails.firstName}
                      </ItemList>
                      <ItemList>
                        Last name: {item.personalDetails.lastName}
                      </ItemList>
                    </ListItem>
                  </PersonalDetailsWrapper>
                  <ShippingDetailsWrapper>
                    <ListItem>
                      <ItemList>
                        Address: {item.shippingAddress.address}
                      </ItemList>
                      <ItemList>City: {item.shippingAddress.city}</ItemList>
                      <ItemList>
                        Postal code: {item.shippingAddress.postalCode}
                      </ItemList>
                      <ItemList>
                        Country: {item.shippingAddress.country}
                      </ItemList>
                    </ListItem>
                  </ShippingDetailsWrapper>
                  <StatusWrapper>
                    <ListItem>
                      <ItemList>Payment method: {item.paymentMethod}</ItemList>
                      <ItemList>Status: {item.status}</ItemList>
                      <ItemList>
                        Paid: {item.isPaid ? "Paid" : "Not paid"}
                      </ItemList>
                    </ListItem>
                  </StatusWrapper>
                </OrderDetailsWrapper>

                <OrderProductsWrapper>
                  {item.orderItems.map((item) => (
                    <OrderProductList key={item._id} item={item} />
                  ))}
                </OrderProductsWrapper>
              </OrderBottomContainer>
            )}
          </AnimatePresence>
        </Order>
      ))}
    </OrderListWrapper>
  );
};

const OrderListWrapper = styled.div`
  width: 100%;
  margin-bottom: 30px;
  min-height: 90vh;
  padding: 75px 75px 0px;
  @media only ${({ theme }) => theme.breakpoints.lg} {
    padding: 75px 30px;
  }
  @media only ${({ theme }) => theme.breakpoints.sm} {
    padding: 75px 4px;
  }
`;

const OrderTitle = styled.h1``;

const Order = styled.div`
  width: 100%;
  margin-bottom: 15px;
  padding: 20px;
  border: 2px solid ${({ theme }) => theme.text.secondary};
  @media only ${({ theme }) => theme.breakpoints.sm} {
    padding: 4px;
  }
`;

const OrderTopContainer = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const OrderNumber = styled.h3`
  a {
    font-size: 2.1rem;
    color: ${({ theme }) => theme.text.primary};
    @media only ${({ theme }) => theme.breakpoints.md} {
      font-size: 1.5rem;
    }
    @media only ${({ theme }) => theme.breakpoints.sm} {
      font-size: 1rem;
    }
  }
  @media only ${({ theme }) => theme.breakpoints.md} {
    font-size: 1.5rem;
  }
  @media only ${({ theme }) => theme.breakpoints.sm} {
    font-size: 1rem;
  }
`;

const OrderPriceContainer = styled.div`
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const OrderNamePrice = styled.span`
  color: ${({ theme }) => theme.text.primary};
  @media only ${({ theme }) => theme.breakpoints.md} {
    font-size: 1rem;
  }
  @media only ${({ theme }) => theme.breakpoints.sm} {
    font-size: 0.6rem;
  }
`;

const OrderTaxPrice = styled.h3`
  color: ${({ theme }) => theme.information.success};
  @media only ${({ theme }) => theme.breakpoints.md} {
    font-size: 1rem;
  }
  @media only ${({ theme }) => theme.breakpoints.sm} {
    font-size: 0.6rem;
  }
`;

const OrderTotalPrice = styled.h3`
  color: ${({ theme }) => theme.information.success};
  @media only ${({ theme }) => theme.breakpoints.md} {
    font-size: 1rem;
  }
  @media only ${({ theme }) => theme.breakpoints.sm} {
    font-size: 0.6rem;
  }
`;

const OrderBottomContainer = styled(motion.div)`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
`;

const OrderDetailsWrapper = styled.div`
  width: 100%;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.text.secondary};
`;

const PersonalDetailsWrapper = styled.div`
  width: 30%;
  margin-right: 20px;
`;

const ShippingDetailsWrapper = styled.div`
  width: 30%;
  margin-right: 20px;
`;
const StatusWrapper = styled.div`
  width: 30%;
`;

const ListItem = styled.ul``;

const ItemList = styled.li`
  font-size: 2rem;
  line-height: 2;
  @media only ${({ theme }) => theme.breakpoints.md} {
    font-size: 1.5rem;
  }
  @media only ${({ theme }) => theme.breakpoints.sm} {
    font-size: 1rem;
  }
`;

const OrderProductsWrapper = styled.div`
  width: 100%;
  max-height: 550px;
  overflow-y: scroll;
`;

export default OrdersList;
