import React from "react";
import Products from "../../components/Products/Products";
import {
  getAllProducts,
  getProductsCategory,
} from "../../redux/actions/productActions";
import { wrapper } from "../../redux/store";

const index = () => {
  return (
    <>
      <Products />
    </>
  );
};

export default index;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, query }) => {
      await store.dispatch(
        getAllProducts(
          req,
          query.page,
          query.search,
          query.category,
          query.sort,
          query.minPriceVal,
          query.maxPriceVal
        )
      );
      await store.dispatch(getProductsCategory(req));
    }
);
