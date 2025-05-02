import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './assets/css/style.css';
import './assets/css/responsive.css';
import Home from './Components/Home';
import ProductListing from './Components/ProductListing';
import { BrowserRouter, Routes, Route } from "react-router";
import ProductDetails from './Components/ProductDetails';
import RootLayout from './Components/RootLayout';
import CommonContext from './Context API/CommonContext';
import Cart from './Components/Cart';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>

    {/* Method 1 */}
    {/* <Routes>
      <Route path="/" element={<Home />} />
      <Route path="categories/:slug?" element={<ProductListing />} />
      <Route path="/product-details/:id" element={<ProductDetails />} />
    </Routes> */}


    {/* Method 2 */}

    <CommonContext>
      <Routes>
        <Route element={<RootLayout/>}>
          <Route path="/" element={<Home />} />
          <Route path="categories/:slug?" element={<ProductListing />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path='/view-cart' element={<Cart/>}/>
        </Route>



        <Route path='admin-panel' element={<RootLayout/>}>
            <Route path='categories'>
              <Route path="add" element={<Home />} />
              <Route path="view" element={<Home />} />
              <Route path="update" element={<Home />} />
              <Route path="delete" element={<Home />} />
            </Route>

            <Route path='products'>
              <Route path="add" element={<Home />} />
              <Route path="view" element={<Home />} />
              <Route path="update" element={<Home />} />
              <Route path="delete" element={<Home />} />
            </Route>
        </Route>
      </Routes>
    </CommonContext>
    






  </BrowserRouter>
)
