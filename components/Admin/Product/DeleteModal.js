import React, { useEffect, useRef, useState } from "react";
import DeleteProduct from "./DeleteProduct";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

const DeleteModal = () => {
  const ref = useRef();
  const modalDeleteRef = useRef();
  const [showModalDelete, setShowModalDelete] = useState(false);

  const closeModalDelete = () => {
    setShowModalDelete(false);
  };

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
      <div onClick={() => setShowModalDelete(true)}>Delete</div>
      <AnimatePresence>
        {showModalDelete && (
          <ModalDeleteContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "easeIn", duration: 1 }}
          >
            <DeleteProduct
              showModalDelete={showModalDelete}
              modalDeleteRef={modalDeleteRef}
              closeModalDelete={closeModalDelete}
            />
          </ModalDeleteContainer>
        )}
      </AnimatePresence>
    </ModalDeleteWrapper>
  );
};

export default DeleteModal;

const ModalDeleteWrapper = styled.div`
  position: relative;
`;

const ModalDeleteContainer = styled(motion.div)`
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
