import React from "react";
import { useForm } from "react-hook-form";
import { db } from "../../config/firebase";
import { doc, updateDoc } from "firebase/firestore";

function UpdateModal(props) {
  const { setOpenUpdateModal, selectedProject, setReload } = props;

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { acronym: selectedProject.acronym, name: selectedProject.name }
  });

  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      setOpenUpdateModal(false);
    }
  }

  async function updateProject(data) {
    await updateDoc(doc(db, "projects", selectedProject.id), {
      acronym: data.acronym,
      name: data.name
    });
    setOpenUpdateModal(false);
    setReload(prev => !prev);
  }

  return (
    <div className="backdrop" onClick={ handleClick }>
      <div className="card text-bg-dark border-secondary p-3">
        <h4 className="">Modifier un projet</h4>
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

          <button className="btn btn-primary w-100 mt-4 mb-2" onClick={ handleSubmit(updateProject) } type="submit">Modifier le projet</button>
        </form>
      </div>
    </div>
  )
};

export default UpdateModal;