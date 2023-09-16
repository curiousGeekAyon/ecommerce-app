import React from "react";
import Checkoutcard from "./Checkoutcard";
import { useItemState } from "./Context";
import { useState, useEffect } from "react";
function Checkout() {
  const { cartState, cartDispatch } = useItemState();
  const [cartArray, setCartArray] = useState([]);
  useEffect(() => {
    let arr = [];
    for (let [key, value] of cartState.cart) {
      arr.push(value);
    }

    setCartArray(arr);
  }, [cartState.cart]);
  function handelProceed() {
    if (cartState.cost > 0 && localStorage.getItem("userName")) {
      alert(`Thank you for shopping \n your grandtotal is ${cartState.cost}$`);
      cartDispatch({
        type: "PROCEED_TO_CHECKOUT",
      });
    } else {
      alert("Please Sign in to proceed");
    }
  }

  return (
    <div className="mainWrapper">
      <div className="bannerWrapper">
        <div className="imgContainer">
          <img
            src="https://m.media-amazon.com/images/I/21O7ipfLhiL.jpg"
            alt="banner image"
          />
        </div>
        <div className="orderSummary">
          <p className="summary">{`Subtotal (n items): ${cartState.cost}$`}</p>
          <div>
            <input type="checkbox" />
            <span className="text">This order contains a gift</span>
          </div>
          <button className="secondaryBtn btn" onClick={handelProceed}>
            Proceed in check list
          </button>
        </div>
      </div>
      <div className="checkoutInfo">
        <h2 className={cartState.cart.length === 0 ? `center` : ``}>
          {cartState.cart.length > 0
            ? `Your shopping basket`
            : `Your basket is empty`}
        </h2>
        <div className="checkoutsList">
          {cartArray.length > 0
            ? cartArray.map((item, i) => {
                let { image, price, title, id, quantity } = item;
                return (
                  <Checkoutcard
                    title={title}
                    image={image}
                    price={price}
                    key={id}
                    id={id}
                    quantity={quantity}
                  />
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
}
export default Checkout;
