import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { darkTheme, lightTheme } from "../../../styles/default";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  paymentOrderStatus,
  statusOrder,
} from "../../../redux/actions/orderActions";
import Loader from "../../Layout/Loader";
import { toast } from "react-toastify";

const UpdateOrder = () => {
  const ref = useRef();
  const modalUpdateRef = useRef();
  const router = useRouter();
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const [paid, setPaid] = useState("");
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const { loading, error, success } = useSelector((state) => state.orderStatus);
  const {
    loading: loadingPaidStatus,
    error: errorPaidStatus,
    success: successPaidStatus,
  } = useSelector((state) => state.setOrderPaid);

  const { id } = router.query;

  const closeModalUpdate = () => {
    setShowModalUpdate(false);
  };

  useEffect(() => {
    if (success || successPaidStatus) {
      router.reload();
    }
    if (error || errorPaidStatus) {
      toast.error(error || errorPaidStatus);
    }
  }, [success, successPaidStatus, error, errorPaidStatus]);

  useEffect(() => {
    const handleMouseClick = (e) => {
      if (showModalUpdate && !modalUpdateRef?.current?.contains(e.target)) {
        setShowModalUpdate(false);
      }
    };

    window.addEventListener("click", handleMouseClick);

    return () => {
      window.removeEventListener("click", handleMouseClick);
    };
  }, [showModalUpdate, ref]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (status) {
      dispatch(statusOrder(status, id));
    }

    if (paid) {
      dispatch(paymentOrderStatus(paid, id));
    }
  };

  return (
    <ModalUpdateWrapper>
      <div ref={ref} onClick={() => setShowModalUpdate(true)}>
        Update
      </div>
      <AnimatePresence>
        {showModalUpdate && (
          <UpdateModalContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "easeIn", duration: 1 }}
          >
            <UpdateModalWrapper ref={modalUpdateRef}>
              <h3>Update Order</h3>
              <Form onSubmit={submitHandler}>
                <UpdateOrderWrapper>
                  <FormGroup>
                    <Label htmlFor="status_field">Status</Label>
                    <Select
                      className="form-control"
                      id="status_field"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <Option value="">Select status</Option>
                      {[
                        "Not processed",
                        "Processing",
                        "Shipped",
                        "Delivered",
                        "Cancelled",
                      ].map((status) => (
                        <Option key={status} value={status}>
                          {status}
                        </Option>
                      ))}
                    </Select>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="paid_field">Paid</Label>
                    <Select
                      className="form-control"
                      id="paid_field"
                      value={paid}
                      onChange={(e) => setPaid(e.target.value)}
                    >
                      <Option value="">Select paid</Option>
                      <Option key="isPaid" value={true}>
                        Paid
                      </Option>
                      <Option key="isNotPaid" value={false}>
                        Not paid
                      </Option>
                    </Select>
                  </FormGroup>
                </UpdateOrderWrapper>
                <ButtonContainer>
                  <CancelButton onClick={() => closeModalUpdate()}>
                    CANCEL
                  </CancelButton>

                  <UpdateButton>UPDATE</UpdateButton>
                </ButtonContainer>
              </Form>
            </UpdateModalWrapper>
          </UpdateModalContainer>
        )}
      </AnimatePresence>
      {loading || (loadingPaidStatus && <Loader />)}
    </ModalUpdateWrapper>
  );
};

export default UpdateOrder;
const ModalUpdateWrapper = styled.div`
  position: relative;
`;

const UpdateModalContainer = styled(motion.div)`
  width: 600px;
  height: 300px;
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
`;

const UpdateModalWrapper = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const UpdateOrderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Form = styled.form`
  width: 100%;
`;

const FormGroup = styled.div`
  width: 40%;
  margin: 10px;
`;

const Label = styled.label`
  font-size: 2rem;
  font-weight: 700;
`;

const Select = styled.select`
  width: 100%;
  height: 30px;
  margin: 10px 0px;
  border-radius: 10px;
  text-transform: capitalize;
  color: ${lightTheme.text.primary};
  background-color: ${darkTheme.text.primary};
  border: 1px solid ${({ theme }) => theme.text.secondary};
`;

const Option = styled.option`
  color: ${lightTheme.text.primary};
  background-color: ${darkTheme.text.primary};
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
`;

const UpdateButton = styled.button`
  width: 180px;
  height: 40px;
  margin-top: 20px;
  background: transparent;
  color: ${({ theme }) => theme.text.secondary};
  border: 2px solid ${({ theme }) => theme.text.secondary};
`;
