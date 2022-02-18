import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { lightTheme } from "../../../styles/default";
import { AiOutlineSearch } from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import { useRouter } from "next/dist/client/router";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../Loader";

const SerchDropDown = ({ closeDropdown, show, searchRef }) => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { userInfo, loading } = useSelector(
    (state) => state.getCurrentUserDetails
  );
  useEffect(() => {
    if (!show) {
      setSearch("");
    }
  }, [show]);

  const submitHandler = (e) => {
    e.preventDefault();

    let link =
      userInfo?.role === "admin"
        ? `/admin/products/?page=${page}`
        : `/products/?page=${page}`;

    if (search) link = link.concat(`&search=${search}`);

    router.push(link);
  };

  return (
    <>
      <AnimatePresence>
        {show && (
          <SearchContainer
            initial={{ opacity: 0, height: "0%" }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", duration: 1 }}
          >
            <Form onSubmit={submitHandler}>
              <SearchWrapper ref={searchRef}>
                <Input
                  value={search}
                  placeholder="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  type="submit"
                  style={{ background: "transparent", border: "none" }}
                >
                  <IconContext.Provider value={{ size: "20px" }}>
                    <AiOutlineSearch onClick={() => closeDropdown()} />
                  </IconContext.Provider>
                </button>
              </SearchWrapper>
            </Form>
          </SearchContainer>
        )}
      </AnimatePresence>
      {loading && (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      )}
    </>
  );
};

export default SerchDropDown;

const SearchContainer = styled(motion.div)`
  width: 300px;
  position: absolute;
  top: 100%;
  svg {
    color: ${({ theme }) => theme.text.primary};
  }
  @media only ${({ theme }) => theme.breakpoints.sm} {
    left: 0%;
  }
`;

const LoaderWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0%;
  left: 0%;
`;

const Form = styled.form``;

const SearchWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 90%;
  height: 40px;
  padding: 0px 10px;
  background-color: ${lightTheme.bg.background};
  border-radius: 15px;
  border: 1px solid ${({ theme }) => theme.text.secondary};
  &::placeholder {
    color: black;
  }
  @media only ${({ theme }) => theme.breakpoints.sm} {
    width: 100%;
    height: 45px;
  }
`;
