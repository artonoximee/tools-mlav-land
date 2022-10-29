import React from "react";
import { useParams } from "react-router-dom";

import Sidebar from "./../Sidebar";

function Show() {
  const { id } = useParams();
  return (
    <div className="row">
      <Sidebar />
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 p-5">
          <div className="row mt-5 justify-content-center">
            <div className="col-8">
              <h2>💶 Show Facture</h2>
              <hr />
              <p>{ id }</p>
            </div>
          </div>
        </main>
    </div>
  )
}

export default Show;