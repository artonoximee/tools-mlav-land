import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

import Sidebar from "./../Sidebar";

function Show() {
  const [invoice, setInvoice] = useState();

  useEffect(() => {
    getInvoice()
  }, [])

  const { id } = useParams();

  async function getInvoice() {
    const q = query(collection(db, "invoices"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    const arr = []
    querySnapshot.forEach((doc) => {
      arr.push(doc.data())
    });
    setInvoice(arr[0]);
  }

  return (
    <div className="row">
      <Sidebar />
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 p-5">
          <div className="row mt-5 justify-content-center">
            <div className="col-8">
              {
                invoice &&
                <>
                  <h2>💶 Facture <small className="badge rounded-pill text-bg-primary">#{ id.substring(0,7) }</small></h2>
                  <hr />
                  <p>{ invoice.name }</p>
                </>
              }
            </div>
          </div>
        </main>
    </div>
  )
}

export default Show;