import { parseCookies } from "nookies";
import React, { useEffect } from "react";
import OrdersList from "../../components/Order/OrdersList";
import { listMyOrders } from "../../redux/actions/orderActions";
import { wrapper } from "../../redux/store";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Layout/Loader";

const MyOrders = () => {
  const orderListMy = useSelector((state) => state.orderListMy);
  const { orders, loading, error } = orderListMy;
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  return (
    <>
      <OrdersList orders={orders} />
      {loading && <Loader />}
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
