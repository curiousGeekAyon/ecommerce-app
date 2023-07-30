import React from "react";
import { useContext } from "react";
import { Items } from "../App";
function CheckoutCard({title,image,price,id}){
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
                        <p className="description">{title}</p>
                        <p className="price">{`Price:${price}$`}</p>
                        <button variant="outlined" className="btn primaryBtn" onClick={handelRemove}>Remove from cart</button>
                    </div>
                </div>
          )
}
export default CheckoutCard;