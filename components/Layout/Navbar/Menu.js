import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useMediaQuery from "../../../hooks/useMediaQuery";
import MenuDropDown from "./MenuDropDown";

const Menu = ({ userInfo }) => {
  const ref = useRef();
  const userInfoRef = useRef();
  const [show, setShow] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1024px)");

  const closeDropdown = () => {
    setShow(false);
  };

  useEffect(() => {
    const handleMouseClick = (e) => {
      if (show && !userInfoRef?.current?.contains(e.target)) {
        setShow(false);
      }
    };

    window.addEventListener("click", handleMouseClick);

    return () => {
      window.removeEventListener("click", handleMouseClick);
    };
  }, [show, ref]);

  return (
    <UserInfoWrapper ref={ref} onClick={() => setShow(true)}>
      <span>{userInfo.email}</span>
      {!isMobile && (
        <MenuDropDown
          show={show}
          userInfoRef={userInfoRef}
          closeDropdown={closeDropdown}
        />
      )}
    </UserInfoWrapper>
  );
};

export default Menu;

const UserInfoWrapper = styled.div`
  position: relative;
`;
