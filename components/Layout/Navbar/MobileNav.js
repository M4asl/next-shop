import React from "react";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import styled from "styled-components";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const itemVariants = {
  closed: {
    opacity: 0,
  },
  open: { opacity: 1 },
};

const sideVariants = {
  closed: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: 1,
    },
  },
};

const mobileNav = ({ links }) => {
  const [open, cycleOpen] = useCycle(false, true);
  console.log(links);
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
              </MenuList>
            </Container>
          </Aside>
        )}
      </AnimatePresence>
      <BtnContainer>
        <Button onClick={cycleOpen}>
          {open ? (
            <AiOutlineClose
              style={{
                fontSize: "2rem",
              }}
            />
          ) : (
            <AiOutlineMenu
              style={{
                fontSize: "2rem",
              }}
            />
          )}
        </Button>
      </BtnContainer>
    </>
  );
};

export default mobileNav;

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
