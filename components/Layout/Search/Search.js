import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import SearchDropDown from "./SerchDropDown";
import { AiOutlineSearch } from "react-icons/ai";

const Search = () => {
  const ref = useRef();
  const searchRef = useRef();
  const [show, setShow] = useState(false);

  const closeDropdown = () => {
    setShow(false);
  };

  useEffect(() => {
    const handleMouseClick = (e) => {
      if (show && !searchRef?.current?.contains(e.target)) {
        setShow(false);
      }
    };

    window.addEventListener("click", handleMouseClick);

    return () => {
      window.removeEventListener("click", handleMouseClick);
    };
  }, [show, ref]);

  return (
    <SearchWrapper ref={ref} onClick={() => setShow(true)}>
      <span>Search Products</span>
      <AiOutlineSearch style={{ marginLeft: "5px", fontSize: "2rem" }} />
      <SearchDropDown
        show={show}
        searchRef={searchRef}
        closeDropdown={closeDropdown}
      />
    </SearchWrapper>
  );
};

export default Search;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
`;
