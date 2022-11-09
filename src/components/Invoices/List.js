/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";

import ListItem from "./ListItem";
import sortByCreationDate from "../../helpers/sortByCreationDate";

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
    sortByCreationDate(arr);
    setInvoices(arr);
  }

  return (
    <>
      <Link to="/invoices/new" className="btn btn-outline-primary w-100 mb-5">Créer une nouvelle facture</Link>

      {/* <div className="list-group">
        {
          invoices &&
          invoices.map((invoice) => <ListItem key={ invoice.id } invoice={ invoice } />)
        }
      </div> */}

        {
          invoices &&
          invoices.map((invoice) => 
          <div class="card text-bg-dark border-secondary mb-4">
            <div class="card-body">
              <div className="row mt-2">
                <div className="col">
                  <h5>
                  { invoice.name }
                    <small className="d-inline-flex px-2 py-1 mx-2 fw-semibold text-primary bg-primary bg-opacity-10 border border-primary border-opacity-10 rounded-pill" aria-disabled="true">
                      { invoice.createdAt.substring(8,10) }/{ invoice.createdAt.substring(5,7) }/{ invoice.createdAt.substring(0,4) }
                    </small>
                    
                  </h5>
                </div>
                <div className="col text-end">
                <div class="dropdown">
                    <button class="btn btn-sm btn-outline-primary text-primary bg-primary bg-opacity-10 border border-primary border-opacity-10 rounded-pill dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      ⚙️
                    </button>
                    <ul class="dropdown-menu dropdown-menu-dark">
                      <li><a class="dropdown-item active" href="#">Action</a></li>
                      <li><a class="dropdown-item" href="#">Another action</a></li>
                      <li><a class="dropdown-item" href="#">Something else here</a></li>
                      <li><hr class="dropdown-divider" /></li>
                      <li><a class="dropdown-item" href="#">Separated link</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          )
        }
    </>
  )
}

export default List;