import React from "react";
import Checkoutcard from "./Checkoutcard";
import { useContext } from "react";
import { Items } from "../App";
function Checkout(){
    const{cart,cost,onProceed}=useContext(Items);
    function handelProceed()
        {
          if(cost>0)
             {
                alert(`Thank you for shopping \n your grandtotal is ${cost}`);
             }  onProceed();
        }
    return (
    <div className="mainWrapper">
     <div className="bannerWrapper">
     <div className="imgContainer">
        <img src="https://m.media-amazon.com/images/I/21O7ipfLhiL.jpg"alt="banner image"/></div>
        <div className="orderSummary">
           <p className="summary">{`Subtotal (n items): ${cost}$`}</p>
           <div>
           <input type="checkbox"/>
           <span className="text">This order contains a gift</span>
           </div>
           <button className="secondaryBtn btn" onClick={handelProceed}>Proceed in check list</button>
         </div>
     </div>
     <div className="checkoutInfo">
        <h2 className={cart.length===0?`center`:``}>{cart.length>0?`Your shopping basket`:`Your basket is empty`}</h2>
         <div className="checkoutsList">
           { 
             cart.length>0?cart.map((item,i)=>{
                console.log(item);
                let{brand,images,price,title}=item;
               return <Checkoutcard brand={brand} image={images[0]} price={price} key={i} id={i} />
            }):null
           }
         </div>
     </div>
    </div>
    )
}
export default Checkout;