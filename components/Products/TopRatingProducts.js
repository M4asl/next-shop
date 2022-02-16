import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../Layout/Loader";
import ProductsCarousel from "./ProductsCarousel";

const TopRatingProducts = () => {
  const { topRatedProducts, loading, error } = useSelector(
    (state) => state.topRatedProducts
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  });

  return (
    <>
      <ProductsCarousel
        title={"Top Rating Products"}
        productsData={topRatedProducts}
      />
      {loading && <Loader />}
    </>
  );
};

export default TopRatingProducts;
