import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { db } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { v4 } from "uuid";

import Sidebar from "./../Sidebar";

function Create() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { currentUser } = useAuth();

  async function createTag(data) {
    const uid = v4();
    const createdAt = new Date().toISOString();
    await setDoc(doc(db, "invoices", uid), {
      id: uid, 
      userId: currentUser.uid,
      name: data.name,
      representative: data.representative,
      address: data.address,
      postcode: data.postcode,
      city: data.city,
      email: data.email,
      telephone: data.telephone,
      createdAt: createdAt
    });
    reset({name: ""})
  }

  return (
    <div className="row">
      <Sidebar />
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 p-5">
          <div className="row mt-5 justify-content-center">
            <div className="col-8">
              <h2>✏️ Créer une nouvelle facture</h2>
              <hr />
              <form>
                <h4 className="mt-5 mb-3">Identité client</h4>
                <label htmlFor="name" className="form-label">Nom de l'entité</label>
                <input 
                  type="text"
                  id="name"
                  className={ `form-control text-bg-dark ${ errors.name && "is-invalid border-danger" }` }
                  placeholder="Dupont & Associés"
                  { ...register("name", { required: true }) }
                />
                { errors.name && <div className="form-text text-danger">Veuillez renseigner un nom d'entité</div> }

                <label htmlFor="representative" className="form-label mt-4">Représentant·e de l'entité</label>
                <input 
                  type="text"
                  id="representative"
                  className={ `form-control text-bg-dark ${ errors.representative && "is-invalid border-danger" }` }
                  placeholder="Marcel Dupont"
                  { ...register("representative", { required: true }) }
                />
                { errors.representative && <div className="form-text text-danger">Veuillez renseigner un·e représentant·e</div> }

                <label htmlFor="address" className="form-label mt-4">N° et rue</label>
                <input 
                  type="text"
                  id="address"
                  className={ `form-control text-bg-dark ${ errors.address && "is-invalid border-danger" }` }
                  placeholder="12 Place de l'Hôtel de Ville"
                  { ...register("address", { required: true }) }
                />
                { errors.address && <div className="form-text text-danger">Veuillez renseigner une adresse</div> }
                
                <div className="row">
                  <div className="col-3">
                    <label htmlFor="postcode" className="form-label mt-4">Code postal</label>
                    <input 
                      type="text"
                      id="postcode"
                      className={ `form-control text-bg-dark ${ errors.postcode && "is-invalid border-danger" }` }
                      placeholder="01234"
                      { ...register("postcode", { required: true }) }
                    />
                    { errors.postcode && <div className="form-text text-danger">Veuillez renseigner un code postal</div> }
                  </div>
                  <div className="col-9">
                    <label htmlFor="city" className="form-label mt-4">Ville</label>
                    <input 
                      type="text"
                      id="city"
                      className={ `form-control text-bg-dark ${ errors.city && "is-invalid border-danger" }` }
                      placeholder="Dupontville"
                      { ...register("city", { required: true }) }
                    />
                    { errors.city && <div className="form-text text-danger">Veuillez renseigner une ville</div> }
                  </div>
                </div>

                <div className="row">
                  <div className="col-6">
                    <label htmlFor="email" className="form-label mt-4">Email</label>
                    <input 
                      type="text"
                      id="email"
                      className={ `form-control text-bg-dark ${ errors.email && "is-invalid border-danger" }` }
                      placeholder="marcel@dupont.com"
                      { ...register("email", { required: true }) }
                    />
                    { errors.email && <div className="form-text text-danger">Veuillez renseigner une adresse email</div> }
                  </div>
                  <div className="col-6">
                    <label htmlFor="telephone" className="form-label mt-4">Téléphone</label>
                    <input 
                      type="text"
                      id="telephone"
                      className={ `form-control text-bg-dark ${ errors.telephone && "is-invalid border-danger" }` }
                      placeholder="01 23 45 67 89"
                      { ...register("telephone", { required: true }) }
                    />
                    { errors.telephone && <div className="form-text text-danger">Veuillez renseigner un numéro de téléphone</div> }
                  </div>
                </div>

                <h4 className="mt-5 mb-3">Éléments à facturer</h4>
                

                <button className="btn btn-primary w-100 mt-5 mb-5" onClick={ handleSubmit(createTag) } type="submit">Créer une nouvelle facture</button>
              </form>
            </div>
          </div>
        </main>
    </div>
  )
}

export default Create;