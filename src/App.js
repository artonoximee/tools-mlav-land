import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/auth/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";

import "./App.css";

import Login from "./components/auth/Login";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="container-fluid text-bg-dark">
          <div className="container">
            <Routes>
              <Route exact path="/" element={ <Login /> } />
              <Route path="/dashboard" element={ <PrivateRoute><Dashboard /></PrivateRoute> } />
              <Route path="*" element={ <h1>Error</h1> } />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
