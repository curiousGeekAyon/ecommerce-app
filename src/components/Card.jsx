import React from "react";
import { Items } from "../App";
import { useContext } from "react";
function Card({title,image,price,id,flag})
    {   const{onAddCart,onSearchAddCart}=useContext(Items);
        function handelAdd(e)
            {
                if(flag)
                   {
                     onSearchAddCart(id);
                   }
                else{
                    console.log(id);
                    onAddCart(id);
                }
            }
         return (
                    <div className="cardWrapper">
                        <div className="img-container" style={{backgroundImage:`url(${image})`}}>
    
                        </div>
                        <div className="text-container">
                            <p className="description">{title}</p>
                            <p className="price">{`Price:${price}$`}</p>
                            <button className="btn" onClick={handelAdd}>Add to cart</button>
                        </div>
                    </div>
              )
    }
export default Card;