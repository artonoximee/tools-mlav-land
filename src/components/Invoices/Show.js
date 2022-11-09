/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { db } from "../../config/firebase";
import { collection, query, where, getDocs, doc, deleteDoc } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";

import PDFInvoice from "./PDFInvoice";

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
      user && invoice && products &&
      <PDFInvoice user={ user } currentUser={ currentUser } invoice={ invoice } products={ products} total={ total } />
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