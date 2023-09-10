// import React from "react";
// import { useItemState } from "./Context";
// import ArrowBackIosNewSharpIcon from '@mui/icons-material/ArrowBackIosNewSharp';
// import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
// function SearchPages(){
// const {pageState}=useItemState();
// function changeSPage(e){
//     // console.log(e.target.id-1);
//     onSPageChange(e.target.id-1);
// }
// function moveFwrd(e)
//         {
//               console.log("hi")
//                 handelSFwrd();
//         }
// function moveBkwrd(e)
// {
//     console.log("hi");
//     handelSBkrd();
// }

// let val=Math.ceil(pageState.sTotal/12);
// console.log(sTotal);
// let pages;
// if(val!==0)
//   {
//     pages=new Array(val).fill(0);
//   }
// else{
//       pages=[];
// }
// console.log(pages);
// return (
//     pages.length > 0 ? (
//       <div className="page-wrapper">
//         {pageState.sPage + 1 > 1 ? <span onClick={moveBkwrd}><ArrowBackIosNewSharpIcon fontSize="large" /></span> : null}
//         {pages.map((page, index) => {
//           return (
//             <span className="pages" key={index + 1} onClick={changeSPage} id={index + 1}>
//               {index + 1}
//             </span>
//           );
//         })}
//         {pageState.sPage + 1 < val ? <ArrowForwardIosSharpIcon fontSize="large" onClick={moveFwrd} /> : null}
//       </div>
//     ) : null
//   );
//     }

// export default SearchPages;