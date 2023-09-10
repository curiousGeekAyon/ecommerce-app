import React from "react";
import { useItemState } from "./Context";
import ArrowBackIosNewSharpIcon from '@mui/icons-material/ArrowBackIosNewSharp';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
function Pages(){
const {pageState,pageDispatch,singleProductState}=useItemState();
console.log(singleProductState)
function changePage(e){
    pageDispatch({
           type:"CHANGE_PAGE",
           id:e.target.id
    })
}
function moveFwrd(e)
        {
              pageDispatch({
                             type:"MOVE_FORWARD"
                           })
        }
function moveBkwrd(e)
{
    pageDispatch({
      type:"MOVE_BACKWARD"
})
}

let val=Math.ceil(pageState.total/12);
console.log(pageState.total);
const pages=new Array(val).fill(0);
console.log(pages);
return(
    <div className="page-wrapper">
    {pageState.page+1>1?<span onClick={moveBkwrd}><ArrowBackIosNewSharpIcon fontSize="large" /></span>:null}
    {pages.map((page, index) => {
      return (
        <span className="pages" key={index + 1} onClick={changePage} id={index+1}>
          {index + 1}
        </span>
      );
    })}
    {pageState.page+1<val?<ArrowForwardIosSharpIcon fontSize="large" onClick={moveFwrd}/>:null}
  </div>
     )
}

export default Pages;