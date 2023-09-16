import React from "react";
import { useItemState } from "./Context";
import ArrowBackIosNewSharpIcon from '@mui/icons-material/ArrowBackIosNewSharp';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
function Pages(){
const {pageState,pageDispatch}=useItemState();
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
const pages=new Array(val).fill(0);
return(
    <div className="page-wrapper">
    {pageState.page+1>1?<span className="pointer-on-hover" onClick={moveBkwrd}><ArrowBackIosNewSharpIcon fontSize="large"/></span>:null}
    {pages.map((page, index) => {
      return (
        <span className="pages" key={index + 1} onClick={changePage} id={index+1}>
          {index + 1}
        </span>
      );
    })}
    {pageState.page+1<val?<span className="pointer-on-hover" onClick={moveFwrd}><ArrowForwardIosSharpIcon fontSize="large"/></span>:null}
  </div>
     )
}

export default Pages;