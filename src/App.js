import React from 'react';
import Navbar from './components/Navbar';
import Products from './components/Products';
import Checkout from './components/Checkout';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import { createContext } from 'react';
import { useState,useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import SignInComponent from './components/Signin';
import SearchResult from './components/SearchResult';
const Items=createContext();
function App() {
  const[data,setData] = useState([]);
  const[searchData,setSearchData] = useState([]);
  const[currSdata,setcurrSdata] = useState([]);
  const[total,setTotal]=useState(0);
  const[page,setPage] = useState(0);
  const[sPage,setSPage] = useState(0);
  const[cart,setCart]=useState([]);
  const[cost,setCost]=useState(0);
  const[searchVal,setSearchVal]=useState("");
  const[sTotal,setSTotal]=useState(0);
  // const naviagate=useNavigate();
  // const[categoryProducts,setCatagoryProducts]=useState([]);

  const contextValue = {
    data,
    currSdata, 
    total,
    sTotal,
    onPageChange,
    onSPageChange,
    onProceed,
    onRefresh,
    page,sPage,
    handelBkrd,
    handelFwrd,
    handelSBkrd,
    handelSFwrd,
    onAddCart,cart,onRemoveCart,cost,onSearch,sTotal
  };
function onRefresh()
  {
      setSearchVal("");
  }
function onAddCart(id)
  {
    console.log(id+"id1");
     const element=data.filter((item,i)=>{
      console.log(item.title+" "+id);
       if(id === i)
          {
            setCost(cost+item.price);
            return true;
          }
     })
     console.log(element);
     const arrCart=[...cart,element[0]]; 
     console.log(arrCart);
     if(element.length>0)
       {
        setCart(arrCart);
       }
  }
function onRemoveCart(id) {
  // console.log("removal called");
    const arrCart=[...cart];
    setCost(cost-arrCart[id].price);
    arrCart.splice(id,1);
    setCart(arrCart);
}
function onSearch(search)
      {
          setSearchVal(search);
      }
useEffect(()=>{
  let val=page*12;
  console.log(page+" "+val);
  fetch(`https://dummyjson.com/products?limit=12&skip=${val}`)
  .then((response)=>{
    return response.json();
  })
  .then((data)=>{
    console.log(data);
    setData(data.products);
    setTotal(data.total);
  })
},[page])

useEffect(()=>{
  console.log("reloading");
  fetch(`https://dummyjson.com/products/search?q=${searchVal}`)
  .then((response)=>response.json())
  .then((data)=>{
     setSearchData(data.products);
     console.log(data.products);
     setcurrSdata(data.products.slice(sPage*12,12));
    // setcurrSdata(searchData.slice(sPage*12,12));
     setSTotal(data.products.length);
  })
},[searchVal])

useEffect(()=>{
   setcurrSdata(searchData.slice(sPage*12,12))
},[sPage])


function onPageChange(id)
    {
       setPage(id);
       console.log("calling"+ id);
    }
function onSPageChange(id)
{
    setSPage(id);
    console.log("calling"+ id);
}
function onProceed()
     {
         setCart([]);
         setCost(0);
     }
function handelFwrd()
      {
        if(page<9)
          {
            setPage(page+1);
          }
        
      }
  function handelSFwrd()
  {
    if(sPage<9)
      {
        setSPage(sPage+1);
      }
    
  }
function handelBkrd(id)
      {
        if(page>0)
          {
            setPage(page-1);
          }
      }
function handelSBkrd(id)
{
  if(sPage>0)
    {
      setSPage(sPage-1);
    }
}
  return (
    <Items.Provider value={contextValue}>
      <Router>
        <Routes>
          <Route path="/" element={<Navbar />}>
            {/* Products component will be shown by default */}
            <Route index element={<Products />} />

            {/* Checkout component will be shown when the path is "/checkout" */}
            <Route path="checkout" element={<Checkout />} />
            <Route path="searchResult" element={<SearchResult />} />
          </Route>

          <Route path="/signin" element={<SignInComponent />} />
        </Routes>
      </Router>
    </Items.Provider>
  );
  
  
}
export {Items}  ;
export default App;
