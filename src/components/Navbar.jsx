import React from "react";
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import SearchIcon from '@mui/icons-material/Search';
import {auth} from './firebaseConfig';
import {signOut} from "firebase/auth";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useItemState } from "./Context";
import { Outlet } from "react-router-dom";
function Navbar() {
   const{cartState,pageDispatch,pageState}=useItemState();
   const [selectedValue, setSelectedValue] = useState("All products");
   const navigate=useNavigate();
   const[sValue,setSValue]=useState("");
   console.log(pageState.categories)
   let user=localStorage.getItem("userName");
   function handelSignOut(){
      console.log("clicking");
      signOut(auth).then(() => {
        localStorage.removeItem("userName");
        alert("Successfully signed out");
        navigate("/");
      }).catch((error) => {
            alert(error);
      });
  }
  
  function handelRefresh()
     {
         pageDispatch({
             type:"REFRESH",
             payload:false
         })
         setSelectedValue("All products");
         setSValue("")
     }
  
  function handelClick(e)
         {
            console.log(sValue);
            if(sValue!=="")
               {
                 
                  const val=sValue;
                  pageDispatch({
                         type:"SEARCH",
                         payload:val
                   });
                   navigate("searchResult");
               }
            else{
                  navigate("");
                  setSValue("")
            }
         }
    function handelChange(e)
        {   
            console.log(e.target.value)
            setSValue(e.target.value);

        }
    return (
      <>
        <div className="navbarWrapper">
        <NavLink to="/" className="nav-link" onClick={handelRefresh}>
           <span className="icon" onClick={()=>{
              pageDispatch({
                     type:"FILTER",
                     payload:"All products"
              })
           }}>
           <StorefrontRoundedIcon style={{ color: 'rgb(255, 216, 20)', fontSize: '25px' }} />
           <span>eShop</span>
           </span>
           </NavLink>
           <div className="input-container">
           <select value={selectedValue}
  onChange={(e) => {
    pageDispatch({
      type: "FILTER",
      payload: e.target.value, // Use e.target.value to get the selected value
         });
      setSelectedValue(e.target.value);
        }}>
  {pageState.categories.map((item, i) => (
    <option key={i} value={item}>
      {item}
    </option>
  ))}
</select>

              <input type="text" placeholder="Search product" value={sValue} onChange={handelChange}/>
              <SearchIcon onClick={handelClick} style={{cursor:"pointer"}}/>
           </div>
           <span className="right">
           <span className="signInWrapper">
              <p>{user?`${user}`:`Hello Guest`}</p>
              {user?<span onClick={handelSignOut} style={{cursor:"pointer"}}>SignOut</span>:<NavLink to='/signin'className="signInbtn"><span>Sign in</span></NavLink>}
           </span>
           <NavLink to="checkout" className="nav-link2" >
           <ShoppingCartCheckoutIcon fontSize="medium"/>
           <span>{cartState.cart.length}</span>
           <span id="CWord">Cart</span>
           </NavLink>
           </span>
        </div>
        <div className="StandbyWrapper">
        <select value={selectedValue}
  onChange={(e) => {
    pageDispatch({
      type: "FILTER",
      payload: e.target.value, // Use e.target.value to get the selected value
         });
      setSelectedValue(e.target.value);
        }}>
  {pageState.categories.map((item, i) => (
    <option key={i} value={item}>
      {item}
    </option>
  ))}
</select>
        <div className="Standby"> <input type="text" placeholder="Search product" value={sValue} onChange={handelChange}/>
              <SearchIcon onClick={handelClick} style={{cursor:"pointer"}}/>
       </div>
       </div>
        <Outlet/>
        </>
    )
}
export default Navbar;