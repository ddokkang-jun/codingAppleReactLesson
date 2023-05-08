import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import data from "./data";
import NavigationBar from "./component/NavigationBar";
import { Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import ProductDetail from "./component/ProductDetail";
import Cart from './routes/Cart';

function App() {
  let [shoes] = useState(data);

  return (
    <div>
      <NavigationBar />
      <Routes>
        <Route path='/' element={<Home shoes={shoes} />} />
        <Route path='/detail/:id' element={<ProductDetail shoes={shoes} />} />
        <Route path="*" element={ <div>404없는페이지임</div> } />
        <Route path='/cart' element={<Cart shoes={shoes} />} />
      </Routes>
    </div>
  );
}

export default App;
