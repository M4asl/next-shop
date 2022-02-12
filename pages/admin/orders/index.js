import { parseCookies } from "nookies";
import React from "react";
import { useSelector } from "react-redux";
import OrdersList from "../../../components/Order/OrdersList";
import { listOrders } from "../../../redux/actions/orderActions";
import { wrapper } from "../../../redux/store";

const OrdersAdmin = ({ role }) => {
  const orderList = useSelector((state) => state.orderList);
  const { orders, loading, error } = orderList;
  return (
    <>
      <OrdersList orders={orders} roleType={role} />
    </>
  );
};

export default OrdersAdmin;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res }) => {
      const { token, role } = await parseCookies({ req });
      console.log(role);
      await store.dispatch(listOrders(req, req.headers.cookie));
      if (!token || role !== "admin") {
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }

      return {
        props: { role },
      };
    }
);
