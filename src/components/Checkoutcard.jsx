import React from "react";
import Button from '@mui/material/Button';
import { useContext } from "react";
import { Items } from "../App";
function CheckoutCard({brand,image,price,id}){
    const {onRemoveCart}=useContext(Items);
    function handelRemove()
       {
           console.log(id+" removed");
           console.log(onRemoveCart(id));
       }
     return (
                <div className="CheckoutcardWrapper">
                    <div className="img-container">
                        <img src={image} alt="item image"/>
                    </div>
                    <div className="text-container">
                        <p className="description">{brand}</p>
                        <p className="price">{`Price:${price}$`}</p>
                        <button variant="outlined" className="btn primaryBtn" onClick={handelRemove}>Remove from cart</button>
                    </div>
                </div>
          )
}
export default CheckoutCard;