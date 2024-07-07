import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./Editing/Style.css";
import Dashboard from "./pages/Dasboard";
import Chatbot from "./pages/Chatbot";
import Login from "./pages/LoginPages";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./Editing/Authentication.js";
import ProtectedRoute from "./Editing/ProtectedRoute.js";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="login" element={<Login />} />
          <Route path="regist" element={<Register />} />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Chatbot />
              </ProtectedRoute>
            }
          />
          <Route path="404" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
