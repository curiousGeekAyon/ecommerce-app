import React from "react";
import SearchPages from "./SearchPages";
import { ItemState } from "./Context";
import { useContext } from "react";
import Card from "./Card";
function SearchResult(){
    const{currSdata}=ItemState();
    console.log(currSdata+"searchResult");
    return (<>{currSdata.length>0?
       (<div className="searchProductsWrapper">
            <div className="products">
              {currSdata.map((item, i) => {
                let { title, images, price } = item;
                return (
                  <Card
                    title={title}
                    image={images[0]}
                    price={price}
                    key={i}
                    id={i}
                    flag={true}
                  />
                );
              })}
            </div>
           {currSdata.length>12?<SearchPages/>:null}
          </div>):<div className="noProducts">Sorry no products found </div>}
    </>)
}

export default SearchResult;