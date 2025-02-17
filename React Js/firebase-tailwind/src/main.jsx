import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./Components/Home";
import RootLoayout from "./Components/RootLoayout";
import './assets/css/style.css'

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>

      <Route element={<RootLoayout/>}>
        <Route path="/" element={<Home />} />
      </Route>
      
    </Routes>
  </BrowserRouter>
);
