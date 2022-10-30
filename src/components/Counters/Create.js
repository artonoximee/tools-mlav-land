/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect} from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { db } from "../../config/firebase";
import { collection, query, where, getDocs, doc, setDoc } from "firebase/firestore";
import { v4 } from "uuid";
import sortByCreationDate from "../../helpers/sortByCreationDate";

function Create() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState();

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

  async function createCounter(data) {
    const counterUid = v4();
    const createdAt = new Date().toISOString();
    await setDoc(doc(db, "counters", counterUid), {
      id: counterUid, 
      userId: currentUser.uid,
      time: data.time.replace(",", "."),
      projectId: data.project,
      createdAt: createdAt
    });
    navigate(`/counters`);
  }

  return (
    <>
      <h4>✏️ Ajouter un nouveau temps</h4>
      <hr />
      <form>
      <div className="row">
        <div className="col-6">
          <label htmlFor="time" className="form-label">Temps passé (en heures)</label>
          <input 
            type="text"
            id="time"
            className={ `form-control text-bg-dark ${ errors.time && "is-invalid border-danger" }` }
            placeholder="4"
            { ...register("time", { required: true }) }
          />
          { errors.time && <div className="form-text text-danger">Veuillez renseigner un temps</div> }
        </div>
        <div className="col-6">
          <label className="form-label">Projet</label>
          <select 
            {...register("project", { required: true })}
            className={`form-control text-bg-dark ${ errors.project && "is-invalid" }`}
            placeholder="Sélection"
          >
            <option value="">Veuillez sélectionner un project</option>
            { 
              projects && 
              projects.map(project => (
                <option key={ project.id } value={ project.id }>{ project.name }</option>
              ))
            }
          </select>
          { errors.project && <div className="fs-6 text-danger">Veuillez choisir un projet</div> }
        </div>
      </div>

      <button className="btn btn-primary w-100 mt-5 mb-5" onClick={ handleSubmit(createCounter) } type="submit">Ajouter un nouveau temps</button>
      </form>
    </>
  )
}

export default Create;