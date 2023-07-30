import React from "react";
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import SearchIcon from '@mui/icons-material/Search';
import {auth} from './firebaseConfig';
import {signOut} from "firebase/auth";
import { NavLink } from "react-router-dom";
import { useContext,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { Items } from "../App";
import { Outlet } from "react-router-dom";
function Navbar() {
   const{cart,onSearch,onRefresh}=useContext(Items);
//    const[categories,setCategories]=useState([]);
//    useEffect(()=>{
//       fetch('https://dummyjson.com/products/categories')
//       .then((response)=>response.json())
//       .then((data)=>{
//         console.log(data);
//         const helper=["All catagories",...data];
//         setCategories(helper);
//       })
// },[])
const[searchValue,setSearchValue]=useState(""); 
   const navigate=useNavigate();
   let user=localStorage.getItem("userName");
   function handelSignOut(){
      console.log("clicking");
      signOut(auth).then(() => {
        localStorage.removeItem("userName");
        navigate("/");
      }).catch((error) => {
            alert(error);
      });
  }
  function handelRefresh()
     {
         setSearchValue("");
         onRefresh();
     }
  function handelChange(e)
      {
         setSearchValue(e.target.value);
      }
  function handelClick()
         {
            console.log("handel search");
            if(searchValue!=="")
               {
                   onSearch(searchValue);
                   navigate("searchResult");
               }
            else{
                  navigate("");
            }
         }
    return (
      <>
        <div className="navbarWrapper">
        <NavLink to="/" className="nav-link" onClick={handelRefresh}>
           <span className="icon">
           <StorefrontRoundedIcon style={{ color: 'rgb(255, 216, 20)', fontSize: '25px' }} />
           <span>eShop</span>
           </span>
           </NavLink>
           <div className="input-container">
           {/* <select onChange="">
           {categories.map((item, i) => (
             <option key={i} value={item.value}>{item}</option>
           ))}</select> */}
              <input type="text" placeholder="Search product here" onChange={handelChange} value={searchValue}/>
              <SearchIcon onClick={handelClick} style={{cursor:"pointer"}}/>
           </div>
           <span className="right">
           <span className="signInWrapper">
              <p>{user?`${user}`:`Hello Guest`}</p>
              {user?<span onClick={handelSignOut}>SignOut</span>:<NavLink to='/signin'className="signInbtn"><span>Sign in</span></NavLink>}
           </span>
           <NavLink to="checkout" className="nav-link2" >
           <ShoppingCartCheckoutIcon fontSize="medium"/>
           <span>{cart.length}</span>
           <span id="CWord">Cart</span>
           </NavLink>
           </span>
        </div>
        <div className="StandbyWrapper">
        {/* <select onChange="">
        {categories.map((item, i) => (
         <option key={i} value={item.value}>{item}</option>
         ))}
      </select> */} 
        <div className="Standby"> <input type="text" placeholder="Search product here" onChange={handelChange}/>
              <SearchIcon onClick={handelClick} style={{cursor:"pointer"}}/>
       </div>
       </div>
        <Outlet/>
        </>
    )
}
export default Navbar;