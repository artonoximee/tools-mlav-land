import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { db } from "../../config/firebase";
import { collection, query, where, getDocs, doc, setDoc } from "firebase/firestore";
import { v4 } from "uuid";
import sortByCreationDate from "../../helpers/sortByCreationDate";

function CreateModal(props) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { date: getToday(),  }
  });
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

  function getToday() {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return dd + '/' + mm + '/' + yyyy;
  }

  async function createCounter(data) {
    const counterUid = v4();
    const createdAt = new Date().toISOString();
    await setDoc(doc(db, "counters", counterUid), {
      id: counterUid, 
      userId: currentUser.uid,
      time: data.time.replace(",", "."),
      projectId: data.project,
      day: data.date,
      task: data.task,
      createdAt: createdAt
    });
    setOpenCreateModal(false);
    setReload(prev => !prev);
  }

  return (
    <div className="backdrop" onClick={ handleClick }>
      <div className="card text-bg-dark border-secondary p-3">
        <h4 className="">Ajouter un compteur</h4>
        <hr />
          <form>
            <div className="row mt-3">
              <div className="col-4">
                <label htmlFor="time" className="form-label">Temps (h)</label>
                <input 
                  type="text"
                  id="time"
                  className={ `form-control text-bg-dark ${ errors.time && "is-invalid border-danger" }` }
                  placeholder="4"
                  { ...register("time", { required: true }) }
                />
                { errors.time && <div className="form-text text-danger">Veuillez renseigner un temps</div> }
              </div>
              <div className="col-8">
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
                      <option key={ project.id } value={ project.id } selected={ project.id === currentProject ? "true" : "" }>{ project.acronym } - { project.name }</option>
                    ))
                  }
                </select>
                { errors.project && <div className="fs-6 text-danger">Veuillez choisir un projet</div> }
              </div>
            </div>

            <label htmlFor="date" className="form-label mt-3">Jour</label>
            <input 
              type="text"
              id="date"
              className={ `form-control text-bg-dark ${ errors.date && "is-invalid border-danger" }` }
              placeholder="dd/mm/yyyy"
              { ...register("date", { required: true }) }
            />
            { errors.date && <div className="form-text text-danger">Veuillez renseigner un temps</div> }

            <label htmlFor="task" className="form-label mt-3">Tâche réalisée</label>
            <input 
              type="text"
              id="task"
              className={ `form-control text-bg-dark` }
              placeholder="Tâche"
              { ...register("task") }
            />

            <button className="btn btn-primary w-100 mt-4 mb-2" onClick={ handleSubmit(createCounter) } type="submit">Ajouter un nouveau temps</button>
          </form>
      </div>
    </div>
  )
};

export default CreateModal;