import React from "react";
import FilterSidebar from "../Component/FilterSidebar/FilterSidebar";
import ProductSection from "../Component/ProductSection/ProductSection";
// import "./Home.css";
import UseCustomContext from "../Hooks/UseCustomContext";

const Home = () => {
  const { cart } = UseCustomContext();
  console.log(cart);
  return (
    <div className="product__body " style={{ marginTop: "6.5rem" }}>
      <FilterSidebar />
      <ProductSection />
    </div>
  );
};

export default Home;
