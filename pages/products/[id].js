import React from "react";
import SingleProductDetails from "../../components/Products/SingleProductDetails";
import { getProductDetails } from "../../redux/actions/productActions";
import { wrapper } from "../../redux/store";

const ProductPage = () => {
  return <SingleProductDetails />;
};

export default ProductPage;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
      await store.dispatch(getProductDetails(req, params.id));
    }
);
