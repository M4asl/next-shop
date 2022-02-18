import React, { useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import UpdateProduct from "./UpdateProduct";

const UpdateModal = () => {
  const [showModalUpdate, setShowModalUpdate] = useState(false);

  const closeModalUpdate = () => {
    setShowModalUpdate(false);
  };

  return (
    <ModalUpdateWrapper>
      <div onClick={() => setShowModalUpdate(true)}>Update</div>
      <AnimatePresence>
        {showModalUpdate && (
          <UpdateModalContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "easeIn", duration: 1 }}
          >
            <UpdateModalWrapper>
              <UpdateProduct
                showModalUpdate={showModalUpdate}
                closeModalUpdate={closeModalUpdate}
              />
            </UpdateModalWrapper>
          </UpdateModalContainer>
        )}
      </AnimatePresence>
    </ModalUpdateWrapper>
  );
};

export default UpdateModal;

const ModalUpdateWrapper = styled.div`
  position: relative;
`;

const UpdateModalContainer = styled(motion.div)`
  width: 100vw;
  height: 100vh !important;
  position: fixed;
  top: 0%;
  left: 0%;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.8);
`;

const UpdateModalWrapper = styled.div`
  width: 500px;
  height: 100%;
  margin: 0 auto;
  @media only ${({ theme }) => theme.breakpoints.xs} {
    width: 100%;
  }
`;
