import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";

function Show() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState();
  const [products, setProducts] = useState();
  const [total, setTotal] = useState();

  useEffect(() => {
    getInvoice()
    getProducts()
  }, [])

  const { id } = useParams();

  async function getInvoice() {
    const q = query(collection(db, "invoices"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    const arr = []
    querySnapshot.forEach((doc) => {
      arr.push(doc.data())
    });
    console.log(arr[0].userId)
    console.log(currentUser.uid)
    if (arr[0].userId !== currentUser.uid) {
      navigate("/dashboard");
    }
    setInvoice(arr[0]);
  }

  async function getProducts() {
    const q = query(collection(db, `invoices/${id}/elements`));
    const querySnapshot = await getDocs(q);
    const arr = [];
    let sum = 0;
    querySnapshot.forEach((doc) => {
      arr.push(doc.data())
    });
    arr.forEach(product => sum += Number(product.price) * Number(product.quantity))
    setTotal(sum);
    setProducts(arr);
  }

  const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  });

  return (
    <>
    {
      invoice &&
      <>
        {/* <h2>💶 Facture <small className="badge rounded-pill text-bg-primary">#{ id.substring(0,7) }</small></h2> */}
        <div className="card text-bg-dark border-secondary mt-5 mb-5 p-3">
          <div className="card-body">
            <div className="row">
                <div class="col-8">
                  <p>
                    <strong>User name</strong> <br />
                    User address <br />
                    User email <br />
                    User telephone
                  </p>
                </div>
                <div class="col-4">
                </div>
              </div>

              <div className="row mt-3 mb-3">
                <div class="col-7">
                </div>
                <div class="col-5">
                  <p>
                    <strong>{ invoice.name }</strong> <br />
                    { invoice.representative } <br />
                    { invoice.address } <br />
                    { invoice.postcode }, { invoice.city } <br />
                    { invoice.email } <br />
                    { invoice.telephone }
                  </p>
                </div>
              </div>

              <div className="row mt-5">
                <div className="col ms-5">
                  <h4>Facture <small className="badge rounded-pill text-bg-primary">#{ invoice.id.substring(0,7) }</small></h4>
                  <hr />
                  <p>Date : { invoice.createdAt.substring(8,10) }/{ invoice.createdAt.substring(5,7) }/{ invoice.createdAt.substring(0,4) }</p>
                </div>
              </div>

              <div className="row mt-5 mb-5">
                <table className="table table-dark table-sm">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Désignation</th>
                      <th scope="col" className="text-end">Quantité</th>
                      <th scope="col" className="text-end">Prix</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      products &&
                      products.map((product, index) => (
                        <tr>
                          <th scope="row" style={{width: "5%"}}>{ index + 1 }</th>
                          <td>{ product.name }</td>
                          <td className="text-end" style={{width: "20%"}}>{ product.quantity }</td>
                          <td className="text-end" style={{width: "20%"}}>{ formatter.format(product.price) }</td>
                        </tr>
                      ))
                    }
                    <tr className="border-bottom border-dark">
                      <th scope="row" style={{width: "5%"}}></th>
                      <td><strong>Total</strong></td>
                      <td style={{width: "15%"}}></td>
                      <td className="text-end" style={{width: "15%"}}><strong>{ formatter.format(total) }</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>

          </div>
        </div>
      </>
    }
    </>
  )
}

export default Show;