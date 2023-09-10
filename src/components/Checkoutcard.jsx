import React from "react";
import { useItemState } from "./Context";
function CheckoutCard({title,image,price,id}){
    const {cartDispatch}=useItemState();
    function handelRemove()
       {
           console.log(id+" removed");
           cartDispatch({
               type:"REMOVE_FROM_CART",
               id:id,
               price:price
           })
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