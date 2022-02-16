import { parseCookies } from "nookies";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";
import DeleteOrder from "../../../components/Admin/Order/DeleteOrder";
import UpdateOrder from "../../../components/Admin/Order/UpdateOrder";
import Loader from "../../../components/Layout/Loader";
import OrderDetails from "../../../components/Order/OrderDetails";
import { getOrderDetails } from "../../../redux/actions/orderActions";
import { wrapper } from "../../../redux/store";

const AdminOrderDetails = ({ role }) => {
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <>
      <OrderDetails orderData={order} />
      {role === "admin" && (
        <ButtonContainer>
          <UpdateButton>
            <UpdateOrder />
          </UpdateButton>
          <DeleteButton>
            <DeleteOrder />
          </DeleteButton>
        </ButtonContainer>
      )}
      {loading && <Loader />}
    </>
  );
};

const ButtonContainer = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-between;
  margin-left: 75px;
  margin-bottom: 75px;
  padding-right: 90px;
`;

const UpdateButton = styled.button`
  width: 180px;
  height: 35px;
  margin-top: 20px;
  background: transparent;
  color: ${({ theme }) => theme.text.secondary};
  border: 2px solid ${({ theme }) => theme.text.secondary};
`;
const DeleteButton = styled.button`
  width: 180px;
  height: 35px;
  margin-top: 20px;
  background: transparent;
  color: ${({ theme }) => theme.information.dangerous};
  border: 2px solid ${({ theme }) => theme.information.dangerous};
`;

export default AdminOrderDetails;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, params }) => {
      const { token, role } = await parseCookies({ req });

      await store.dispatch(getOrderDetails(req, req.headers.cookie, params.id));
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
