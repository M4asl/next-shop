import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { deleteOrder } from "../../../redux/actions/orderActions";
import { toast } from "react-toastify";
import Loader from "../../Layout/Loader";

const DeleteOrder = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const ref = useRef();
  const modalDeleteRef = useRef();
  const [showModalDelete, setShowModalDelete] = useState(false);
  const { loading, error, success } = useSelector((state) => state.orderDelete);

  const { id } = router.query;

  const closeModalDelete = () => {
    setShowModalDelete(false);
  };

  const deleteOrderHandler = () => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (success) {
      router.push("/admin/orders");
    }
    if (error) {
      toast.error(error);
    }
  }, [success, error]);

  useEffect(() => {
    const handleMouseClick = (e) => {
      if (showModalDelete && !modalDeleteRef?.current?.contains(e.target)) {
        setShowModalDelete(false);
      }
    };

    window.addEventListener("click", handleMouseClick);

    return () => {
      window.removeEventListener("click", handleMouseClick);
    };
  }, [showModalDelete, ref]);

  return (
    <ModalDeleteWrapper>
      <div ref={ref} onClick={() => setShowModalDelete(true)}>
        Delete
      </div>
      <AnimatePresence>
        {showModalDelete && (
          <DeleteModalContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "easeIn", duration: 1 }}
          >
            <DeleteModalWrapper ref={modalDeleteRef}>
              <Title>Are you sure you want to remove the order</Title>
              <ButtonContainer>
                <CancelButton onClick={() => closeModalDelete()}>
                  CANCEL
                </CancelButton>
                <DeleteButton onClick={() => deleteOrderHandler()}>
                  {loading ? <Loader /> : "DELETE"}
                </DeleteButton>
              </ButtonContainer>
            </DeleteModalWrapper>
          </DeleteModalContainer>
        )}
      </AnimatePresence>
    </ModalDeleteWrapper>
  );
};

export default DeleteOrder;
const ModalDeleteWrapper = styled.div`
  position: relative;
`;

const DeleteModalContainer = styled(motion.div)`
  width: 400px;
  height: 180px;
  padding: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  @media only ${({ theme }) => theme.breakpoints.sm} {
    width: 300px;
    height: 150px;
  }
`;

const DeleteModalWrapper = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text.primary};
  @media only ${({ theme }) => theme.breakpoints.sm} {
    font-size: 1.5rem;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
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
  @media only ${({ theme }) => theme.breakpoints.sm} {
    width: 120px;
  }
`;

const DeleteButton = styled.button`
  width: 180px;
  height: 35px;
  margin-top: 20px;
  background: transparent;
  color: ${({ theme }) => theme.information.dangerous};
  border: 2px solid ${({ theme }) => theme.information.dangerous};
  font-weight: 700;
  @media only ${({ theme }) => theme.breakpoints.sm} {
    width: 120px;
  }
`;
