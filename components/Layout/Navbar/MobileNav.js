import React from "react";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import styled from "styled-components";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/actions/authActions";

const itemVariants = {
  closed: {
    opacity: 0,
  },
  open: { opacity: 1 },
};

const sideVariants = {
  closed: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: 1,
    },
  },
};

const MobileNav = ({ links }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.getCurrentUserDetails);
  const { cartItems } = useSelector((state) => state.cart);
  const [open, cycleOpen] = useCycle(false, true);
  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <>
      <AnimatePresence>
        {open && (
          <Aside
            initial={{ width: 0 }}
            animate={{
              width: 300,
            }}
            exit={{
              width: 0,
              transition: { delay: 0.7, duration: 0.3 },
            }}
          >
            <Container
              className="container"
              initial="closed"
              animate="open"
              exit="closed"
              variants={sideVariants}
            >
              <MenuList>
                {links.map((item) => (
                  <motion.li
                    key={item.id}
                    className="link"
                    variants={itemVariants}
                    onClick={cycleOpen}
                  >
                    <Link href={item.url}>{item.text}</Link>
                  </motion.li>
                ))}
                <motion.li variants={itemVariants} onClick={cycleOpen}>
                  <Link href="/orders/my">Orders</Link>
                </motion.li>
                {userInfo.role === "admin" && (
                  <>
                    <motion.li variants={itemVariants} onClick={cycleOpen}>
                      <Link href="/admin/products">Products Admin</Link>
                    </motion.li>
                    <motion.li variants={itemVariants} onClick={cycleOpen}>
                      <Link href="/admin/orders">Orders Admin</Link>
                    </motion.li>
                    <motion.li variants={itemVariants} onClick={cycleOpen}>
                      <Link href="/admin/products/new">Create Product</Link>
                    </motion.li>
                  </>
                )}
                {userInfo && (
                  <motion.li variants={itemVariants} onClick={logoutHandler}>
                    <Link href="/">Logout</Link>
                  </motion.li>
                )}
                <motion.li
                  variants={itemVariants}
                  onClick={cycleOpen}
                  style={{ position: "relative" }}
                  className="link"
                >
                  <Dot>{cartItems.length}</Dot>
                  <Link href="/cart">cart</Link>
                </motion.li>
              </MenuList>
            </Container>
          </Aside>
        )}
      </AnimatePresence>
      <BtnContainer>
        <Button onClick={cycleOpen}>
          {open ? (
            <IconContext.Provider value={{ size: "20px" }}>
              <AiOutlineClose />
            </IconContext.Provider>
          ) : (
            <IconContext.Provider value={{ size: "20px" }}>
              <AiOutlineMenu />
            </IconContext.Provider>
          )}
        </Button>
      </BtnContainer>
    </>
  );
};

export default MobileNav;

const Aside = styled(motion.div)`
  background-color: ${({ theme }) => theme.bg.background};
  width: 18.75rem;
  height: 100vh;
  position: absolute;
  top: 0%;
  z-index: 2;
`;

const Container = styled(motion.div)`
  height: 50%;
  margin: 4.5rem 1.4rem;
`;

const MenuList = styled.ul`
  width: 100% !important;
  height: 100%;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
`;

const BtnContainer = styled(motion.div)`
  z-index: 2;
`;

const Button = styled(motion.button)`
  background-color: transparent;
  border: none;
  cursor: pointer;
  // margin: 1.25rem;
  padding: 1rem 1rem;
  color: ${({ theme }) => theme.text.primary};
`;

const Dot = styled.span`
  position: absolute;
  top: 2%;
  left: 66%;
  padding: 2px 6px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.information.warning};
`;
