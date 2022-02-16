import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../Layout/Loader";
import ProductsCarousel from "./ProductsCarousel";

const LatestProducts = () => {
  const { lastestProducts, loading, error } = useSelector(
    (state) => state.lastestProducts
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  });

  return (
    <>
      <ProductsCarousel
        title={"Lastest Products"}
        productsData={lastestProducts}
      />
      {loading && <Loader />}
    </>
  );
};

export default LatestProducts;
