import React from "react";
import Card from "./Card";
import { useContext } from "react";
import { Items } from "../App";
import Pages from "./Pages";

function Products() {
  const { data } = useContext(Items);
  return (
    <>
      {data.length >0 ? (
        <div className="product">
          <div className="prImage">
            <img
              src="https://images-eu.ssl-images-amazon.com/images/G/31/AmazonBusiness/BVD_B2C/Hero/Banner1_3000x1200_1707._CB600339417_.jpg"
              alt="image"
            />
          </div>
          <div className="productsWrapper">
            <div className="products">
              {data.map((item, i) => {
                let {images, price, title } = item;
                return (
                  <Card
                    title={title}
                    image={images[0]}
                    price={price}
                    key={i}
                    id={i}
                    flag={false}
                  />
                );
              })}
            </div>
            <Pages />
          </div>
        </div>
      ) : (
        <div className="loadingWrapper">
        <p className="loading">Loading</p>
        </div>
      )}
    </>
  );
}

export default Products;
