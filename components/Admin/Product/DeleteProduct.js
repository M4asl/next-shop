import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";
import { deleteProduct } from "../../../redux/actions/productActions";

const DeleteProduct = ({
  showModalDelete,
  modalDeleteRef,
  closeModalDelete,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    loading: productDetailsLoading,
    error: productDetailsError,
    productDetails,
  } = useSelector((state) => state.productDetails);

  const { loading, error, isDeleted, success } = useSelector(
    (state) => state.deleteProduct
  );

  useEffect(() => {
    if (success) {
      toast.success(isDeleted.message);
      router.push("/admin/products");
    }
  }, [success, isDeleted]);

  const deleteProductHandler = () => {
    dispatch(deleteProduct(productDetails._id));
  };

  return (
    <ModalWrapper ref={modalDeleteRef}>
      <Title>Are you sure you want to remove the product</Title>
      <ButtonContainer>
        <CancelButton onClick={() => closeModalDelete()}>CANCEL</CancelButton>
        <DeleteButton onClick={() => deleteProductHandler()}>
          DELETE
        </DeleteButton>
      </ButtonContainer>
    </ModalWrapper>
  );
};

export default DeleteProduct;

const ModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text.primary};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CancelButton = styled.button`
  width: 180px;
  height: 35px;
  margin-top: 20px;
  background: transparent;
  color: ${({ theme }) => theme.text.secondary};
  border: 2px solid ${({ theme }) => theme.text.secondary};
  font-weight: 700;
`;
const DeleteButton = styled.button`
  width: 180px;
  height: 35px;
  margin-top: 20px;
  background: transparent;
  color: ${({ theme }) => theme.information.dangerous};
  border: 2px solid ${({ theme }) => theme.information.dangerous};
  font-weight: 700;
`;
