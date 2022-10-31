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

  async function createProject(data) {
    const projectUid = v4();
    const createdAt = new Date().toISOString();
    await setDoc(doc(db, "projects", projectUid), {
      id: projectUid,
      acronym: data.acronym,
      userId: currentUser.uid,
      name: data.name,
      createdAt: createdAt
    });
    setOpenCreateModal(false);
    setReload(prev => !prev);
  }

  return (
    <div className="backdrop" onClick={ handleClick }>
      <div className="card text-bg-dark border-secondary p-3">
        <h4 className="">Ajouter un projet</h4>
        <hr />
        <form>
          <div className="row mt-3">
            <div className="col-3">
              <label htmlFor="acronym" className="form-label">Acronyme</label>
              <input 
                type="text"
                id="acronym"
                className={ `form-control text-bg-dark ${ errors.acronym && "is-invalid border-danger" }` }
                placeholder="B1"
                { ...register("acronym", { required: true }) }
              />
              { errors.acronym && <div className="form-text text-danger">Veuillez renseigner un acronyme</div> }
            </div>
            <div className="col-9">
              <label htmlFor="name" className="form-label">Nom du projet</label>
              <input 
                type="text"
                id="name"
                className={ `form-control text-bg-dark ${ errors.name && "is-invalid border-danger" }` }
                placeholder="Nom du projet"
                { ...register("name", { required: true }) }
              />
              { errors.name && <div className="form-text text-danger">Veuillez renseigner un nom de projet</div> }
            </div>
          </div>

          <button className="btn btn-primary w-100 mt-4 mb-2" onClick={ handleSubmit(createProject) } type="submit">Créer un nouveau projet</button>
        </form>
      </div>
    </div>
  )
};

export default CreateModal;