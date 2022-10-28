import React from "react";

import Sidebar from "./Sidebar";

function Dashboard() {
  return (
    <div className="row">
      <Sidebar />
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 p-5">
          <div className="row mt-5 justify-content-center">
            <div className="col-8">
              <h2>🏠 Dashboard</h2>
              <hr />
            </div>
          </div>
        </main>
    </div>
  )
}

export default Dashboard;