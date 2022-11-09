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
                <i className="fa-solid fa-house me-2"></i>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/projects" onClick={ closeSidebar } className={`nav-link ${ location.pathname.includes("projects") ? "active" : "text-white" }`}>
                <i className="fa-solid fa-folder me-2"></i>
                Projets
              </Link>
            </li>
            <li>
              <Link to="/counters" onClick={ closeSidebar } className={`nav-link ${ location.pathname.includes("counters") ? "active" : "text-white" }`}>
                <i className="fa-solid fa-gauge me-2"></i>
                Compteurs
              </Link>
            </li>
            <li>
              <Link to="/transfers" onClick={ closeSidebar } className={`nav-link ${ location.pathname.includes("transfers") ? "active" : "text-white" }`}>
              <i className="fa-solid fa-cloud-arrow-up me-2"></i>
                Transferts
              </Link>
            </li>
            <li>
              <Link to="/quotes" onClick={ closeSidebar } className={`nav-link ${ location.pathname.includes("quotes") ? "active" : "text-white" }`}>
                <i className="fa-solid fa-briefcase me-2"></i>
                Devis
              </Link>
            </li>
            <li>
              <Link to="/invoices" onClick={ closeSidebar } className={`nav-link ${ location.pathname.includes("invoices") ? "active" : "text-white" }`}>
                <i className="fa-solid fa-file-invoice me-2"></i>
                Factures
              </Link>
            </li>
          </ul>

          <hr />

          <ul className="nav nav-pills flex-column">
          <li className="nav-item">
              <Link to={ `/users/${ currentUser.uid }` } onClick={ closeSidebar } className="nav-link text-white">
                <i className="fa-solid fa-user me-2"></i>
                Compte
              </Link>
            </li>
            <li className="nav-item">
              <Link onClick={handleLogOut} className="nav-link text-white">
                <i className="fa-solid fa-right-from-bracket me-2"></i>
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