import { parseCookies } from "nookies";
import React from "react";
import OrdersList from "../../components/Order/OrdersList";
import { listMyOrders } from "../../redux/actions/orderActions";
import { wrapper } from "../../redux/store";
import { useSelector } from "react-redux";

const MyOrders = () => {
  const orderListMy = useSelector((state) => state.orderListMy);
  const { orders, loading, error } = orderListMy;
  return (
    <>
      <OrdersList orders={orders} />
    </>
  );
};

export default MyOrders;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res }) => {
      const { token } = await parseCookies({ req });
      await store.dispatch(listMyOrders(req, req.headers.cookie));
      if (!token) {
        return {
          redirect: {
            destination: "/login",
            permanent: false,
          },
        };
      }
    }
);
