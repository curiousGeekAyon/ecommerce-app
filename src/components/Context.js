import React from 'react';

import { useState,useEffect,createContext,useContext} from 'react';


const Items=createContext();

function Context({children}) {
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

  const contextValue = {
    data,
    currSdata, 
    total,
    sTotal,
    onPageChange,
    onSPageChange,
    onProceed,
    onRefresh,
    onSearchAddCart,
    page,sPage,
    handelBkrd,
    handelFwrd,
    handelSBkrd,
    handelSFwrd,
    onAddCart,cart,onRemoveCart,cost,onSearch
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
function onSearchAddCart(id)
       {
        const element=currSdata.filter((item,i)=>{
          console.log(item.title+" "+id);
           if(id === i)
              {
                setCost(cost+item.price);
                return true;
              }
         })
         const arrCart=[...cart,element[0]]; 
         console.log(arrCart);
         if(element.length>0)
           {
            setCart(arrCart);
           }
       }
function onRemoveCart(id) {
 
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
  if(searchVal!="")
     {
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
}
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
return <Items.Provider value={contextValue}>{children}</Items.Provider>  
}

export const ItemState = () => {
  return useContext(Items);
};
export default Context;

