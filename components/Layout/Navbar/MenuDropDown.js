import React from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/actions/authActions";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { lightTheme } from "../../../styles/default";

const MenuDropDown = ({ closeDropdown, show, userInfoRef }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.getCurrentUserDetails);

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <AnimatePresence>
      {show && (
        <DropDownContainer
          style={{ overflow: "hidden" }}
          initial={{ opacity: 0, height: "0" }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: "0" }}
          transition={{ type: "spring", duration: 1 }}
        >
          <li>
            <Link href="/orders/my">Orders</Link>
          </li>
          {userInfo.role === "admin" && (
            <>
              <li>
                <Link href="/admin/products">Products Admin</Link>
              </li>
              <li>
                <Link href="/admin/orders">Orders Admin</Link>
              </li>
              <li>
                <Link href="/admin/products/new">Create Product</Link>
              </li>
            </>
          )}
          <li onClick={logoutHandler}>
            <Link href="/">Logout</Link>
          </li>
        </DropDownContainer>
      )}
    </AnimatePresence>
  );
};

export default MenuDropDown;

const DropDownContainer = styled(motion.div)`
  width: 250px;
  position: absolute;
  top: 100%;
  left: -48%;
  text-align: center;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  a {
    font-size: 1.4rem;
    color: ${lightTheme.text.primary};
  }
  li {
    border-bottom: 1px solid white;
  }
  li:last-child {
    border: none;
  }
`;
