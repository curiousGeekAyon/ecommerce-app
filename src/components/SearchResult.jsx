import React from "react";
import SearchPages from "./SearchPages";
import { Items } from "../App";
import { useContext } from "react";
import Card from "./Card";
function SearchResult(){
    const{currSdata}=useContext(Items);
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
                  />
                );
              })}
            </div>
           {currSdata.length>12?<SearchPages/>:null}
          </div>):<div className="noProducts">Sorry no products found </div>}
    </>)
}

export default SearchResult;