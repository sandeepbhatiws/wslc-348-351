import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./Components/Home";
import RootLoayout from "./Components/RootLoayout";
import './assets/css/style.css'
import AddQuiz from "./Components/AddQuiz";
import ViewQuiz from "./Components/ViewQuiz";
import PlayQuiz from "./Components/PlayQuiz";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Context from "./Components/CommonContext/Context";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Context>
      <Routes>
        <Route element={<RootLoayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/add-quiz" element={<AddQuiz />} />
          <Route path="/view-quiz" element={<ViewQuiz />} />
          <Route path="/play-quiz" element={<PlayQuiz />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </Context>


  </BrowserRouter>
);
