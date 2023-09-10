import React, { useState,useEffect } from 'react';
import { useItemState } from "./Context";
import { FaArrowRight } from 'react-icons/fa'; // Import the right arrow icon from react-icons
import { useParams } from 'react-router-dom';

const SingleProduct = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const{id}=useParams();
  const[singlePd,setSinglePd]=useState(null)
  console.log(id);
  const { pageState,cartDispatch } = useItemState();
  useEffect(()=>{
    console.log(id);
    fetch(`https://dummyjson.com/products/${id}`)
    .then((response) => {
      return response.json();
    })
    .then((data)=>{
      console.log(data);
           setSinglePd(data);
    }).catch((err)=>{console.log(err)});
  },[id])
  
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % singlePd.images.length);
    console.log("calling next");
  };
  
  function handelAdd()
  {
          
          cartDispatch({
                   type:"ADD_TO_CART",
                   payload:{
                              title:singlePd.title,
                              image:singlePd.images[0],
                              price:singlePd.price,
                           }
          })
          console.log(pageState);
  }

  return (singlePd?
    <div className="single-product">
      <div className="product-image-container">
        <img
          src={singlePd.images[currentImageIndex]}
          alt={singlePd.title}
          className="product-image-large"
        />
        <button className="next-image-button" onClick={handleNextImage}>
          <FaArrowRight />
        </button>
      </div>
      <div className="product-details">
        <h2 className="product-title">{singlePd.title}</h2>
        <p className="product-description">{singlePd.description}</p>
        <p className="product-price">Price: ${singlePd.price}</p>
        <p className="product-discount">Discount: {singlePd.discountPercentage}%</p>
        <p className="product-rating">Rating: {singlePd.rating}</p>
        <p className="product-stock">Stock: {singlePd.stock}</p>
        <p className="product-brand">Brand: {singlePd.brand}</p>
        <p className="product-category">Category: {singlePd.category}</p>
        <button className="btn" onClick={handelAdd}>Add to cart</button>
      </div>
    </div>:<p>loading</p>
  );
};

export default SingleProduct;


