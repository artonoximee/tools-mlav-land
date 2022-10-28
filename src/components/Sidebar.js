import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block text-bg-dark sidebar collapse fixed-top">
    
      <Link to="/dashboard" className="d-flex align-items-center mt-4 mb-3 mb-md-0 me-md-auto text-white text-decoration-none fs-4">
        <span class="badge rounded-pill text-bg-primary">🛠️</span>
        <span className="ps-2">MLAV Tools</span>
      </Link>

      <hr />

      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link active" aria-current="page">
            🏠
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/quotes" className="nav-link text-white">
            🗄️
            Devis
          </Link>
        </li>
        <li>
          <Link to="/invoices" className="nav-link text-white">
            💶
            Factures
          </Link>
        </li>
        <li>
          <Link to="/counter" className="nav-link text-white">
            ⏱️
            Compteur
          </Link>
        </li>
      </ul>

      <hr className="" />

      <ul className="nav nav-pills flex-column">
        <li className="nav-item">
          <Link className="nav-link text-white">
            🚶
            Déconnexion
          </Link>
        </li>
      </ul>
    
    </nav>
  )
}

export default Sidebar;