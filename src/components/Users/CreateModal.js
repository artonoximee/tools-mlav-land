import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { db } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { v4 } from "uuid";

function CreateModal(props) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { currentUser } = useAuth();
  const { setOpenCreateModal, setReload } = props;

  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      setOpenCreateModal(false);
    }
  }

  async function createUser(data) {
    const createdAt = new Date().toISOString();
    await setDoc(doc(db, "users", currentUser.uid), {
      id: currentUser.uid,
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      address: data.address || "",
      postcode: data.postcode || "",
      city: data.city || "",
      telephone: data.telephone || "",
      createdAt: createdAt
    });
    setOpenCreateModal(false);
    setReload(prev => !prev);
  }

  return (
    <div className="backdrop" onClick={ handleClick }>
      <div className="card text-bg-dark border-secondary p-3">
        <h4 className="">Ajouter des informations</h4>
        <hr />
        <form>
          <div className="row mt-3">
            <div className="col-6">
              <label htmlFor="lastName" className="form-label">Nom</label>
              <input 
                type="text"
                id="lastName"
                className={ `form-control text-bg-dark ${ errors.lastName && "is-invalid border-danger" }` }
                placeholder="Dupont"
                { ...register("lastName") }
              />
              { errors.lastName && <div className="form-text text-danger">Veuillez renseigner un nom</div> }
            </div>
            <div className="col-6">
              <label htmlFor="firstName" className="form-label">Prénom</label>
              <input 
                type="text"
                id="firstName"
                className={ `form-control text-bg-dark ${ errors.firstName && "is-invalid border-danger" }` }
                placeholder="Marcel"
                { ...register("firstName") }
              />
              { errors.firstName && <div className="form-text text-danger">Veuillez renseigner un prénom</div> }
            </div>
          </div>

          <label htmlFor="firstName" className="form-label mt-3">Addresse (N° et rue)</label>
          <input 
            type="text"
            id="address"
            className={ `form-control text-bg-dark ${ errors.address && "is-invalid border-danger" }` }
            placeholder="12 Place de l'Hôtel de Ville"
            { ...register("address") }
          />
          { errors.address && <div className="form-text text-danger">Veuillez renseigner une adresse</div> }

          <div className="row mt-3">
            <div className="col-6">
              <label htmlFor="postcode" className="form-label">Code postal</label>
              <input 
                type="text"
                id="postcode"
                className={ `form-control text-bg-dark ${ errors.postcode && "is-invalid border-danger" }` }
                placeholder="01234"
                { ...register("postcode") }
              />
              { errors.postcode && <div className="form-text text-danger">Veuillez renseigner un code postal</div> }
            </div>
            <div className="col-6">
              <label htmlFor="city" className="form-label">Ville</label>
              <input 
                type="text"
                id="city"
                className={ `form-control text-bg-dark ${ errors.city && "is-invalid border-danger" }` }
                placeholder="Dupontville"
                { ...register("city") }
              />
              { errors.city && <div className="form-text text-danger">Veuillez renseigner une ville</div> }
            </div>
          </div>

          <label htmlFor="telephone" className="form-label mt-3">Téléphone</label>
          <input 
            type="text"
            id="telephone"
            className={ `form-control text-bg-dark ${ errors.telephone && "is-invalid border-danger" }` }
            placeholder="0123456789"
            { ...register("telephone") }
          />
          { errors.telephone && <div className="form-text text-danger">Veuillez renseigner un numéro de téléphone</div> }

          <button className="btn btn-primary w-100 mt-4 mb-2" onClick={ handleSubmit(createUser) } type="submit">Envoyer</button>
        </form>
      </div>
    </div>
  )
};

export default CreateModal;