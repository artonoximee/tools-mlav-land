import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/Auth/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";

import "./App.css";

import Login from "./components/Auth/Login";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Projects from "./components/Projects/List";
import CreateProject from "./components/Projects/Create";
import Quotes from "./components/Quotes/List";
import Invoices from "./components/Invoices/List";
import CreateInvoice from "./components/Invoices/Create";
import ShowInvoice from "./components/Invoices/Show";
import Counters from "./components/Counters/List";
import CreateCounter from "./components/Counters/Create";
import ShowCounters from "./components/Counters/Show";
import Transfers from "./components/Transfers/List";
import ShowUser from "./components/Users/Show";

function App() {
  return (
    <AuthProvider>
      <Router>
      
      <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 border-bottom border-secondary"> 
        <div className="p-2 ps-3 pb-3 fs-4">
          <span className="badge rounded-pill text-bg-primary logo-emoji">🛠️</span>
          <span className="ps-2 fw-bold text-light logo-text">mlavTools</span>
          <span className="badge rounded-pill text-bg-danger logo-version">v0.1.5</span>
        </div>

        <div className="pe-3">
          <button className="navbar-toggler collapsed border-0" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </header>


        <div className="container-fluid text-bg-dark">
          <Routes>
            <Route exact path="/" element={ <Login /> } />
            <Route path="/dashboard" element={ <PrivateRoute><Sidebar><Dashboard /></Sidebar></PrivateRoute> } />
            <Route path="/projects" element={ <PrivateRoute><Sidebar><Projects /></Sidebar></PrivateRoute> } />
            <Route path="/projects/new" element={ <PrivateRoute><Sidebar><CreateProject /></Sidebar></PrivateRoute> } />
            <Route path="/quotes" element={ <PrivateRoute><Sidebar><Quotes /></Sidebar></PrivateRoute> } />
            <Route path="/invoices" element={ <PrivateRoute><Sidebar><Invoices /></Sidebar></PrivateRoute> } />
            <Route path="/invoices/new" element={ <PrivateRoute><Sidebar><CreateInvoice /></Sidebar></PrivateRoute> } />
            <Route path="/invoices/:id" element={ <PrivateRoute><Sidebar><ShowInvoice /></Sidebar></PrivateRoute> } />
            <Route path="/counters" element={ <PrivateRoute><Sidebar><Counters /></Sidebar></PrivateRoute> } />
            <Route path="/counters/new" element={ <PrivateRoute><Sidebar><CreateCounter /></Sidebar></PrivateRoute> } />
            <Route path="/counters/:id" element={ <PrivateRoute><Sidebar><ShowCounters /></Sidebar></PrivateRoute> } />
            <Route path="/transfers" element={ <PrivateRoute><Sidebar><Transfers /></Sidebar></PrivateRoute> } />
            <Route path="/users/:id" element={ <PrivateRoute><Sidebar><ShowUser /></Sidebar></PrivateRoute> } />
            <Route path="*" element={ <h1>Error</h1> } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
