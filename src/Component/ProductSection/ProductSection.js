import React from "react";
import { productData } from "../../Data/ProductData";
// import Card from "../UI/Card";
import "./ProductSection.css";
import ProductItem from "../ProductItem/ProductItem";
// import useCustomContext from "../../Hooks/UseCustomContext";

const ProductSection = () => {
  const productItemsList = productData;
  const productList = productItemsList.map((data, idx) => (
    <ProductItem key={data.id} data={data} />
  ));
  return (
    <div className="productsection">
      {productItemsList && productList}
      {productItemsList.length === 0 && <h1>No Product Available</h1>}
    </div>
  );
};

export default ProductSection;
