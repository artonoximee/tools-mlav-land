import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";

import Sidebar from "./../Sidebar";
import Item from "./Item";
import sortInvoices from "../../helpers/sortInvoices";

function List() {
  const { currentUser } = useAuth();
  const [invoices, setInvoices] = useState();

  useEffect(() => {
    getInvoices()
  }, [])

  async function getInvoices() {
    const q = query(collection(db, "invoices"), where("userId", "==", currentUser.uid));
    const querySnapshot = await getDocs(q);
    const arr = []
    querySnapshot.forEach((doc) => {
      arr.push(doc.data())
    });
    sortInvoices(arr);
    setInvoices(arr);
  }

  return (
    <div className="row">
      <Sidebar />
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 p-5">
          <div className="row mt-5 justify-content-center">
            <div className="col-8">
              <h2>💶 Factures</h2>
              <hr />
              <Link to="/invoices/new" className="btn btn-outline-primary w-100 mb-5">Créer une nouvelle facture</Link>

              <div class="list-group">
                {
                  invoices &&
                  invoices.map((invoice) => <Item key={ invoice.id } invoice={ invoice } />)
                }
              </div>

            </div>
          </div>
        </main>
    </div>
  )
}

export default List;