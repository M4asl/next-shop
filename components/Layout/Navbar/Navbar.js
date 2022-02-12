import React, { useEffect, useState } from "react";
import Link from "next/link";
import styled, { css } from "styled-components";
import useMediaQuery from "../../../hooks/useMediaQuery";
import MobileNav from "./MobileNav";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../../redux/actions/userActions";
import Search from "../Search/Search";
import Menu from "./Menu";

const menuListItem = [
  {
    id: 1,
    url: "/",
    text: "ApplyShop",
  },
  {
    id: 2,
    url: "/products",
    text: "Products",
  },
];

const Navbar = () => {
  const [show, setShow] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1024px)");

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.getCurrentUserDetails);
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    if (!userInfo) {
      dispatch(loadUser());
    }
  }, [dispatch, userInfo]);

  const controlNavbar = () => {
    if (window.scrollY > 100) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, []);

  return (
    <Navigation show={show}>
      {!isMobile && (
        <LeftSideWrapper>
          <ul>
            {menuListItem.map((item) => (
              <li key={item.id} className="link">
                <Link href={item.url}>{item.text}</Link>
              </li>
            ))}
          </ul>
          <div style={{ position: "relative" }} className="link">
            <Dot>{cartItems.length}</Dot>
            <Link href="/cart">cart</Link>
          </div>
          <Search />
        </LeftSideWrapper>
      )}
      <RightSideWrapper>
        <ul>
          {userInfo ? (
            <>
              <Menu userInfo={userInfo} />
            </>
          ) : (
            <li>
              <Link href="/login">Login</Link>
            </li>
          )}
        </ul>
      </RightSideWrapper>
      {isMobile && <MobileNav links={menuListItem} />}
    </Navigation>
  );
};

export default Navbar;

const Navigation = styled.nav`
  width: 100%;
  position: fixed;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  ${({ show }) =>
    show &&
    css`
      backdrop-filter: blur(30px);
    `}
  ul {
    width: 50%;
    list-style-type: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.8rem;
    padding: 0px;
  }

  a {
    color: ${({ theme }) => theme.text.primary};
    font-size: 1.2rem;
    text-transform: uppercase;
    text-decoration: none;
    letter-spacing: 0.15em;

    display: inline-block;
    padding: 15px 20px;
    position: relative;
  }

  a:after {
    background: none repeat scroll 0 0 transparent;
    bottom: 0;
    content: "";
    display: block;
    height: 2px;
    left: 50%;
    position: absolute;
    background: ${({ theme }) => theme.text.secondary};
    transition: width 0.3s ease 0s, left 0.3s ease 0s;
    width: 0;
  }

  a:hover:after {
    width: 100%;
    left: 0;
  }
`;

const LeftSideWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const RightSideWrapper = styled.div``;

const Dot = styled.span`
  position: absolute;
  top: 2%;
  left: 66%;
  padding: 2px 6px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.information.warning};
`;
