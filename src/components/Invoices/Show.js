/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { db } from "../../config/firebase";
import { collection, query, where, getDocs, doc, deleteDoc } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";

function Show() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [user, setUser] = useState();
  const [invoice, setInvoice] = useState();
  const [products, setProducts] = useState();
  const [total, setTotal] = useState();

  useEffect(() => {
    getUser()
    getInvoice()
    getProducts()
  }, [])

  const { id } = useParams();

  async function getUser() {
    const q = query(collection(db, "users"), where("id", "==", currentUser.uid));
    const querySnapshot = await getDocs(q);
    const arr = []
    querySnapshot.forEach((doc) => {
      arr.push(doc.data())
    });
    setUser(arr[0]);
  }

  async function getInvoice() {
    const q = query(collection(db, "invoices"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    const arr = []
    querySnapshot.forEach((doc) => {
      arr.push(doc.data())
    });
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

  async function deleteInvoice(data) {
    if (data.delete === "EFFACER") {
      const invoice = doc(db, "invoices", data.invoiceId);
      await deleteDoc(invoice);
      navigate("/invoices");
    }
  };

  return (
    <>
    {
      invoice &&
      <>
        <div className="card text-bg-dark border-secondary mt-5 mb-5 p-3">
          <div className="card-body">
            <div className="row">
                <div className="col-8">
                  {
                    user &&
                    <p>
                      <strong>{ user.firstName } {user.lastName}</strong> <br />
                      { user.address } <br />
                      { user.postcode }, { user.city } <br />
                      { currentUser.email } <br />
                      { user.telephone } <br />
                      N° SIRET : { user.siret } <br />
                    </p>
                  }
                  {
                    !user &&
                    <Link to={ `/users/${ currentUser.uid }` } className="btn btn-outline-danger">
                      Pour afficher vos coordonnées, <br /> entrez vos informations dans la partie Compte
                    </Link>
                  }
                  
                </div>
                <div className="col-4">
                </div>
              </div>

              <div className="row mt-3 mb-3">
                <div className="col-7">
                </div>
                <div className="col-5">
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
                        <tr key={index}>
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

    <div className="card text-bg-dark border-danger mt-5 mb-5 p-3">
      <h4 className="text-danger">Supprimer la facture</h4>
      <p>Une fois que vous avez supprimé votre projet, il est impossible de revenir en arrière. Soyez-en sûr. Veuillez taper <span className="font-monospace text-danger">EFFACER</span> pour confirmer l'action.</p>
      <form>
        <input 
          type="hidden" 
          value={ id }
          { ...register("invoiceId", { required: true }) }
        />
        <div className="input-group mb-3">
            <input 
              type="text"
              id="delete"
              className={ `form-control border-secondary text-bg-dark mt-2 ${ errors.delete && "is-invalid border-danger" }` }
              placeholder="EFFACER"
              { ...register("delete", { required: true }) }
            />
            <button className="btn btn-outline-danger mt-2" onClick={handleSubmit(deleteInvoice)}>Envoyer</button>
        </div>
        { errors.delete && <div className="form-text text-danger">Veuillez entrer "EFFACER" pour confirmer la suppression</div>}
        
      </form>
    </div>
    </>
  )
}

export default Show;