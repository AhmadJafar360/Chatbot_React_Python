import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./Editing/Style.css";
import Dashboard from "./pages/Dasboard";
import Chatbot from "./pages/Chatbot";
import Login from "./pages/LoginPages";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Dashboard />} />
          <Route path="regist" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="404" element={<NotFound />} />
        </Route>
        <Route path="/chat">
          <Route index element={<Chatbot />} />
        </Route>
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
