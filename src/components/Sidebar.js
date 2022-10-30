import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Sidebar.css";

function Sidebar({ children }) {
  const [error, setError] = useState("");
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  async function handleLogOut() {
    setError("")
    try {
      await logOut();
      navigate("/");
    } catch {
      setError("Échec de la déconnexion");
    }
  }

  return (
    <div className="row">
      <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block text-bg-dark sidebar collapse fixed-top">
      
        <Link to="/dashboard" className="d-flex align-items-center mt-4 mb-3 mb-md-0 me-md-auto text-white text-decoration-none fs-4">
          <span className="badge rounded-pill text-bg-primary">🛠️</span>
          <span className="ps-2 fw-bold">mlavTools</span>
          <sup><span className="badge rounded-pill text-bg-danger sup">v0.1.2</span></sup>
        </Link>

        <hr />

        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <Link to="/dashboard" className={`nav-link ${ location.pathname.includes("dashboard") ? "active" : "text-white" }`} aria-current="page">
              🏠
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/projects" className={`nav-link ${ location.pathname.includes("projects") ? "active" : "text-white" }`}>
              🏗️
              Projets
            </Link>
          </li>
          <li>
            <Link to="/quotes" className={`nav-link ${ location.pathname.includes("quotes") ? "active" : "text-white" }`}>
              💼
              Devis
            </Link>
          </li>
          <li>
            <Link to="/invoices" className={`nav-link ${ location.pathname.includes("invoices") ? "active" : "text-white" }`}>
              💶
              Factures
            </Link>
          </li>
          <li>
            <Link to="/counter" className={`nav-link ${ location.pathname.includes("counter") ? "active" : "text-white" }`}>
              ⏱️
              Compteur
            </Link>
          </li>
        </ul>

        <hr className="" />

        <ul className="nav nav-pills flex-column">
          <li className="nav-item">
            <Link onClick={handleLogOut} className="nav-link text-white">
              🚪
              Déconnexion
            </Link>
          </li>
        </ul>
      
      </nav>
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 p-5">
          <div className="row mt-5 justify-content-center">
            <div className="col-lg-8 col-md-10 col-sm-12">
              { children }
            </div>
          </div>
        </main>
    </div>
  )
}

export default Sidebar;