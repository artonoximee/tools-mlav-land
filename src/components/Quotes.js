import React from "react";

import Sidebar from "./Sidebar";

function Quotes() {
  return (
    <div className="row">
      <Sidebar />
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 p-5">
          <div className="row mt-5 justify-content-center">
            <div className="col-10">
              <h2>🗄️ Devis</h2>
              <hr />
            </div>
          </div>
        </main>
    </div>
  )
}

export default Quotes;