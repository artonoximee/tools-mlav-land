import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Sidebar.css";

function Sidebar({ children }) {
  const [error, setError] = useState("");
  const { currentUser, logOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState("show");

  async function handleLogOut() {
    setError("")
    try {
      await logOut();
      navigate("/");
    } catch {
      setError("Échec de la déconnexion");
    }
  }

  function closeSidebar() {
    setShowSidebar("")
  }

  return (
    <div className="row">
      <nav id="sidebarMenu" className={ `col-md-2 col-lg-2 d-md-block bg-dark border-end border-secondary sidebar collapse ${ showSidebar }` }>
        <div className="position-sticky pt-3 sidebar-sticky">
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <Link to="/dashboard" onClick={ closeSidebar } className={ `nav-link ${ location.pathname.includes("dashboard") ? "active" : "text-white" }` } aria-current="page">
                🏠
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/projects" onClick={ closeSidebar } className={`nav-link ${ location.pathname.includes("projects") ? "active" : "text-white" }`}>
                🏗️
                Projets
              </Link>
            </li>
            <li>
              <Link to="/counters" onClick={ closeSidebar } className={`nav-link ${ location.pathname.includes("counters") ? "active" : "text-white" }`}>
                ⏱️
                Compteurs
              </Link>
            </li>
            <li>
              <Link to="/quotes" onClick={ closeSidebar } className={`nav-link ${ location.pathname.includes("quotes") ? "active" : "text-white" }`}>
                💼
                Devis
              </Link>
            </li>
            <li>
              <Link to="/invoices" onClick={ closeSidebar } className={`nav-link ${ location.pathname.includes("invoices") ? "active" : "text-white" }`}>
                💶
                Factures
              </Link>
            </li>
          </ul>

          <hr />

          <ul className="nav nav-pills flex-column">
          <li className="nav-item">
              <Link to={ `/users/${ currentUser.uid }` } onClick={ closeSidebar } className="nav-link text-white">
                🧑‍💻 
                Compte
              </Link>
            </li>
            <li className="nav-item">
              <Link onClick={handleLogOut} className="nav-link text-white">
                🚪
                Déconnexion
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <main className="col-lg-10 col-md-10 ms-sm-auto px-md-4 p-5">
          <div className="row mt-5 justify-content-center">
            <div className="col-lg-10 col-md-12 col-sm-12">
              { children }
            </div>
          </div>
        </main>
    </div>
  )
}

export default Sidebar;