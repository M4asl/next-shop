import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { darkTheme, lightTheme } from "../../styles/default";
import { AiOutlineClear } from "react-icons/ai";
import Link from "next/link";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { clearErrors } from "../../redux/actions/globalActions";
import { IconContext } from "react-icons/lib";

const FilterProducts = () => {
  const { categories } = useSelector((state) => state.productsCategories);

  const sortOptions = [
    {
      name: "Newest",
      value: "-createdAt",
    },
    {
      name: "Lowest Price",
      value: "price",
    },
    {
      name: "Highest Price",
      value: "-price",
    },
    {
      name: "Name: A - Z",
      value: "name",
    },
    {
      name: "Name: Z - A",
      value: "-name",
    },
  ];
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [minVal, setMinVal] = useState("");
  const [maxVal, setMaxVal] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    setCategory("");
    setSort("");
    setMinVal("");
    setMaxVal("");
  }, [router.query.search]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (Number(minVal) > Number(maxVal)) {
      toast.error("The second value must be higher or equal.");
      dispatch(clearErrors());
    } else {
      const rangeStr = `&minPriceVal=${Number(minVal)}&maxPriceVal=${Number(
        maxVal
      )}`;
      let link = `/products/?page=${page}`;

      if (router.query.search)
        link = link.concat(`&search=${router.query.search}`);
      if (category) link = link.concat(`&category=${category}`);
      if (sort) link = link.concat(`&sort=${sort}`);
      if (minVal || maxVal) link = link.concat(rangeStr);

      router.push(link);
    }
  };

  const clearFilters = () => {
    setCategory("");
    setSort("");
    setMinVal("");
    setMaxVal("");
  };

  return (
    <>
      <Form onSubmit={submitHandler}>
        <FilterProductsWrapper>
          <RangePriceWrapper>
            <label htmlFor="product_categories">Price range</label>
            <Input
              type="number"
              min="1"
              placeholder="From"
              value={minVal}
              onChange={(e) => setMinVal(e.target.value)}
            />
            <Input
              type="number"
              min="1"
              placeholder="To"
              value={maxVal}
              onChange={(e) => setMaxVal(e.target.value)}
            />
          </RangePriceWrapper>
          <CategoryWrapper>
            <label htmlFor="product_categories">Product category</label>
            <Select
              id="product_categories"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <Option key={category} value={category}>
                  {category}
                </Option>
              ))}
            </Select>
          </CategoryWrapper>
          <SortByWrapper>
            <label htmlFor="product_categories">Sort options</label>

            <Select
              id="product_categories"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Sort by</option>
              {sortOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.name}
                </Option>
              ))}
            </Select>
          </SortByWrapper>
        </FilterProductsWrapper>
        <ButtonContainer>
          <ButtonClear onClick={clearFilters}>
            <Link href="/products">CLEAR ALL</Link>
            <IconContext.Provider value={{ size: "20px" }}>
              <AiOutlineClear />
            </IconContext.Provider>
          </ButtonClear>
          <ButtonSearch type="submit">ADD FILTERS</ButtonSearch>
        </ButtonContainer>
      </Form>
    </>
  );
};

export default FilterProducts;

const FilterProductsWrapper = styled.div`
  width: 800px;
  height: 100px;
  display: flex;
  padding: 15px;
  justify-content: space-between;
  @media only ${({ theme }) => theme.breakpoints.md} {
    width: 600px;
  }
  @media only ${({ theme }) => theme.breakpoints.sm} {
    width: 400px;
    height: auto;
    flex-direction: column;
  }
  @media only ${({ theme }) => theme.breakpoints.xs} {
    width: 280px;
    padding: 0px;
  }
`;

const Form = styled.form`
  width: 100%;
  height: 200px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  @media only ${({ theme }) => theme.breakpoints.sm} {
    height: auto;
  }
  @media only ${({ theme }) => theme.breakpoints.xs} {
    width: 280px;
    padding: 0px;
  }
`;

const RangePriceWrapper = styled.div`
  width: 30%;
  height: 100%;
  @media only ${({ theme }) => theme.breakpoints.sm} {
    width: 100%;
    & > * {
      margin: 10px 0px;
    }
  }
`;

const CategoryWrapper = styled.div`
  width: 30%;
  height: 100%;
  .react-select-container {
    background-color: red;
  }
  @media only ${({ theme }) => theme.breakpoints.sm} {
    width: 100%;
    & > * {
      margin: 10px 0px;
    }
  }
`;

const Input = styled.input`
  width: 100%;
  height: 30px;
  padding: 0px 10px;
  border-radius: 10px;
  color: ${lightTheme.text.primary};
  background-color: ${darkTheme.text.primary};
  border: 1px solid ${({ theme }) => theme.text.secondary};
  &:last-child {
    margin-top: 10px;
  }
  &::placeholder {
    color: ${lightTheme.text.primary};
  }
`;

const Select = styled.select`
  width: 100%;
  height: 30px;
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

const SortByWrapper = styled.div`
  width: 30%;
  height: 100%;
  @media only ${({ theme }) => theme.breakpoints.sm} {
    width: 100%;
    & > * {
      margin: 10px 0px;
    }
  }
`;

const ButtonContainer = styled.div`
  width: 800px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  @media only ${({ theme }) => theme.breakpoints.md} {
    width: 600px;
  }
  @media only ${({ theme }) => theme.breakpoints.sm} {
    width: 400px;
    height: auto;
    font-size: 1.4rem;
  }
  @media only ${({ theme }) => theme.breakpoints.xs} {
    width: 280px;
  }
`;

const ButtonClear = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  display: flex;
  justify-content: center;
  letter-spacing: 0.2rem;
  color: ${({ theme }) => theme.information.dangerous};
  font-weight: 500;
  a {
    color: ${({ theme }) => theme.information.dangerous};
  }
`;
const ButtonSearch = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  display: flex;
  justify-content: center;
  letter-spacing: 0.2rem;
  color: ${({ theme }) => theme.text.secondary};
  font-weight: 500;
`;
