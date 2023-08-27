import React from "react";
import { useContext, } from "react";
import { ItemState } from "./Context";
import ArrowBackIosNewSharpIcon from '@mui/icons-material/ArrowBackIosNewSharp';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
function Pages(){
const {total,onPageChange,page,handelBkrd,handelFwrd}=ItemState();
function changePage(e){
    // console.log(e.target.id-1);
    onPageChange(e.target.id-1);
}
function moveFwrd(e)
        {
              console.log("hi")
                handelFwrd();
        }
function moveBkwrd(e)
{
    console.log("hi");
    handelBkrd();
}

let val=Math.ceil(total/12);
console.log(total);
const pages=new Array(val).fill(0);
console.log(pages);
return(
    <div className="page-wrapper">
    {page+1>1?<span onClick={moveBkwrd}><ArrowBackIosNewSharpIcon fontSize="large" /></span>:null}
    {pages.map((page, index) => {
      return (
        <span className="pages" key={index + 1} onClick={changePage} id={index+1}>
          {index + 1}
        </span>
      );
    })}
    {page+1<val?<ArrowForwardIosSharpIcon fontSize="large" onClick={moveFwrd}/>:null}
  </div>
     )
}

export default Pages;