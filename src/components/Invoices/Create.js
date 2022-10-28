import React from "react";

import Sidebar from "./../Sidebar";

function List() {
  return (
    <div className="row">
      <Sidebar />
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 p-5">
          <div className="row mt-5 justify-content-center">
            <div className="col-10">
              <h2>✏️ Créer une nouvelle facture</h2>
              <hr />
            </div>
          </div>
        </main>
    </div>
  )
}

export default List;