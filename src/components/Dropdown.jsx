import { useState,useEffect } from 'react';
export default function Dropdown() {
  const[categories,setCategories]=useState([]);
  useEffect(()=>{
         fetch('https://dummyjson.com/products/categories')
         .then((response)=>response.json())
         .then((data)=>{
           console.log(data);
           setCategories(data);
         })
  },[])
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <select onChange="">
  {categories.map((item, i) => (
    <option key={i} value={item.value}>{item}</option>
  ))}
</select>
    </div>
  );
}