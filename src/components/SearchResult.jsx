import React from "react";
// import SearchPages from "./SearchPages";
import { useItemState } from "./Context";
import Card from "./Card";
function SearchResult(){
    const{pageState}=useItemState();
    console.log(pageState.currPSearchData);
    return (<>{pageState.currPSearchData.length>0?
       (<div className="searchProductsWrapper">
            <div className="products">
              {pageState.currPSearchData.map((item, i) => {
                return (
                  <Card
                    item={item}
                    key={i}
                    id={i}
                    flag={true}
                  />
                );
              })}
            </div>
           {/* {pageState.totalSearchData.length>12?<SearchPages/>:null} */}
          </div>):<div className="noProducts">Sorry no products found </div>}
    </>)
}

export default SearchResult;