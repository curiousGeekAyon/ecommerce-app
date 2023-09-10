import React from "react";
import { useItemState } from "./Context";
import { useNavigate } from "react-router-dom";
function Card({item,id})
    {   const{cartDispatch,pageState,singleProductDispatch,singleProductState,setSingleData}=useItemState();
        const navigate=useNavigate();
        function handelAdd()
            {
                    console.log(id);
                    cartDispatch({
                             type:"ADD_TO_CART",
                             payload:{
                                        title:item.title,
                                        image:item.images[0],
                                        price:item.price,
                                     }
                    })
                    console.log(pageState);
            }
         return (
                    <div className="cardWrapper">
                        <div className="img-container" style={{backgroundImage:`url(${item.images[0]})`}}>
    
                        </div>
                        <div className="text-container">
                            <p className="description">{item.title}</p>
                            <p className="price">{`Price:${item.price}$`}</p>
                            <p  className="Rating price">{`Rating: ${item.rating}`}</p>
                            <p  className="stock price">{`Quatity remains: ${item.stock}`}</p>
                            <button className="button" onClick={()=>{
                                   console.log(singleProductState);
                                   setSingleData(item);

                                //    singleProductDispatch({
                                //            type:"SET_PRODUCT",
                                //            payload: item,
                                //            id:id
                                //    })
                                  navigate(`singleProduct/${id}`);
                            }}>Read more....</button>
                            <button className="btn" onClick={handelAdd}>Add to cart</button>
                        </div>
                    </div>
              )
    }
export default Card;