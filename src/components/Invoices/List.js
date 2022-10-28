import React from "react";
import { Link } from "react-router-dom";

import Sidebar from "./../Sidebar";

function List() {
  return (
    <div className="row">
      <Sidebar />
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 p-5">
          <div className="row mt-5 justify-content-center">
            <div className="col-8">
              <h2>💶 Factures</h2>
              <hr />
              <Link to="/invoices/new" className="btn btn-outline-primary w-100">Créer une nouvelle facture</Link>
            </div>
          </div>
        </main>
    </div>
  )
}

export default List;