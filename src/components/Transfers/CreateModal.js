import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { db } from "../../config/firebase";
import { collection, query, where, getDocs, doc, setDoc } from "firebase/firestore";
import { v4 } from "uuid";
import sortByCreationDate from "../../helpers/sortByCreationDate";

function CreateModal(props) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { currentUser } = useAuth();
  const { setOpenCreateModal, setReload, currentProject } = props;
  const [projects, setProjects] = useState();

  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      setOpenCreateModal(false);
    }
  }

  useEffect(() => {
    getProjects()
  }, [])

  async function getProjects() {
    const q = query(collection(db, "projects"), where("userId", "==", currentUser.uid));
    const querySnapshot = await getDocs(q);
    const arr = []
    querySnapshot.forEach((doc) => {
      arr.push(doc.data())
    });
    sortByCreationDate(arr);
    setProjects(arr);
  }

  async function createTransfer(data) {
    const transferUid = v4();
    const createdAt = new Date().toISOString();
    await setDoc(doc(db, "transfers", transferUid), {
      id: transferUid, 
      userId: currentUser.uid,
      projectId: data.project,
      createdAt: createdAt
    });
    setOpenCreateModal(false);
    setReload(prev => !prev);
  }

  return (
    <div className="backdrop" onClick={ handleClick }>
      <div className="card text-bg-dark border-secondary p-3">
        <h4 className="">Ajouter un fichier</h4>
        <hr />
          <form>
            <div className="row mt-3">
              <div className="col-12">
                <label htmlFor="name" className="form-label">Nom du fichier</label>
                <input 
                  type="text"
                  id="name"
                  className={ `form-control text-bg-dark ${ errors.name && "is-invalid border-danger" }` }
                  placeholder="4"
                  { ...register("name", { required: true }) }
                />
                { errors.time && <div className="form-text text-danger">Veuillez renseigner un nom de fichier</div> }
              </div>
              <div className="col-12 mt-3">
                <label className="form-label">Projet</label>
                <select 
                  {...register("project", { required: true })}
                  className={`form-control text-bg-dark ${ errors.project && "is-invalid" }`}
                  placeholder="Sélection"
                >
                  <option value="">Veuillez sélectionner un projet</option>
                  { 
                    projects && 
                    projects.map(project => (
                      <option key={ project.id } value={ project.id }>{ project.acronym } - { project.name }</option>
                    ))
                  }
                </select>
                { errors.project && <div className="fs-6 text-danger">Veuillez choisir un projet</div> }
              </div>
              <div className="col-12 mt-3">
              <label className="form-label">Fichier</label>
              <input 
                type="file"
                { ...register("file", { required: true }) }
                className={`form-control text-bg-dark border-secondary ${ errors.file && "is-invalid" }`}
              />
              { errors.file && <div className="fs-6 text-danger">Veuillez choisir un fichier</div> }
              </div>
            </div>

            <button className="btn btn-primary w-100 mt-4 mb-2" onClick={ handleSubmit(createTransfer) } type="submit">Ajouter un nouveau fichier</button>
          </form>
      </div>
    </div>
  )
};

export default CreateModal;