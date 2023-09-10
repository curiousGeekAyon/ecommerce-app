import React from 'react';
import Navbar from './components/Navbar';
import Products from './components/Products';
import Checkout from './components/Checkout';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import SignInComponent from './components/Signin';
import SearchResult from './components/SearchResult';
import SingleProduct from './components/SingleProduct';
function App() {
  return (
      <Router>
        
        <Routes>
        
          <Route path="/" element={<Navbar />}>
            {/* Products component will be shown by default */}
            <Route index element={<Products />} />
            {/* Checkout component will be shown when the path is "/checkout" */}
            <Route path="checkout" element={<Checkout />} />
            <Route path="searchResult" element={<SearchResult />} />
            <Route path="singleProduct/:id" element={<SingleProduct />} />
            
          </Route>

          <Route path="/signin" element={<SignInComponent />} />
        </Routes>
        
      </Router>
  );
   
}
export default App;
