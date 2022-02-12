import { parseCookies } from "nookies";
import React from "react";
import Products from "../../../components/Products/Products";
import {
  getAllProducts,
  getProductsCategory,
} from "../../../redux/actions/productActions";
import { wrapper } from "../../../redux/store";

const index = ({ role }) => {
  return (
    <>
      <Products role={role} />
    </>
  );
};

export default index;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, query }) => {
      const { token, role } = await parseCookies({ req });

      if (!token || role !== "admin") {
        return {
          redirect: {
            destination: "/login",
            permanent: false,
          },
        };
      }

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

      return {
        props: { role },
      };
    }
);
