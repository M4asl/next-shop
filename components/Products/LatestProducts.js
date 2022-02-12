import React from "react";
import { useSelector } from "react-redux";
import ProductsCarousel from "./ProductsCarousel";

const LatestProducts = () => {
  const { lastestProducts, loading } = useSelector(
    (state) => state.lastestProducts
  );

  return (
    <ProductsCarousel
      title={"Lastest Products"}
      productsData={lastestProducts}
    />
  );
};

export default LatestProducts;
