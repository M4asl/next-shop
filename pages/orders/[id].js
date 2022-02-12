import React from "react";
import { wrapper } from "../../redux/store";
import { parseCookies } from "nookies";
import { getOrderDetails } from "../../redux/actions/orderActions";
import { useSelector } from "react-redux";
import OrderDetails from "../../components/Order/OrderDetails";

const Order = ({ role }) => {
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  return (
    <>
      <OrderDetails orderData={order} roleType={role} />
    </>
  );
};

export default Order;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, params }) => {
      const { token, role } = await parseCookies({ req });
      await store.dispatch(getOrderDetails(req, req.headers.cookie, params.id));
      if (!token) {
        return {
          redirect: {
            destination: "/login",
            permanent: false,
          },
        };
      }

      return {
        props: { role },
      };
    }
);
