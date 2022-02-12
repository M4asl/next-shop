import React from "react";
import { useSelector } from "react-redux";
import ProductsCarousel from "./ProductsCarousel";

const TopRatingProducts = () => {
  const { topRatedProducts, loading } = useSelector(
    (state) => state.topRatedProducts
  );

  return (
    <ProductsCarousel
      title={"Top Rating Products"}
      productsData={topRatedProducts}
    />
  );
};

export default TopRatingProducts;
