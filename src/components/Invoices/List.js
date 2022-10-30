/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";

import ListItem from "./ListItem";
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
    <>
      <h4>💶 Factures</h4>
      <hr />
      <Link to="/invoices/new" className="btn btn-outline-primary w-100 mb-5">Créer une nouvelle facture</Link>

      <div className="list-group">
        {
          invoices &&
          invoices.map((invoice) => <ListItem key={ invoice.id } invoice={ invoice } />)
        }
      </div>
    </>
  )
}

export default List;