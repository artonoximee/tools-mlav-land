import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/Auth/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";

import "./App.css";

import Login from "./components/Auth/Login";
import Dashboard from "./components/Dashboard";
import Quotes from "./components/Quotes/List";
import Invoices from "./components/Invoices/List";
import Counter from "./components/Counters/List";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="container-fluid text-bg-dark">
          <Routes>
            <Route exact path="/" element={ <Login /> } />
            <Route path="/dashboard" element={ <PrivateRoute><Dashboard /></PrivateRoute> } />
            <Route path="/quotes" element={ <PrivateRoute><Quotes /></PrivateRoute> } />
            <Route path="/invoices" element={ <PrivateRoute><Invoices /></PrivateRoute> } />
            <Route path="/counter" element={ <PrivateRoute><Counter /></PrivateRoute> } />
            <Route path="*" element={ <h1>Error</h1> } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
