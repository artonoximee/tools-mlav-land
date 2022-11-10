/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { db } from "../../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import sortByCreationDate from "../../helpers/sortByCreationDate";

function InviteModal(props) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { currentUser } = useAuth();
  const { setOpenInviteModal } = props;
  const [projects, setProjects] = useState();

  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      setOpenInviteModal(false);
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

  return (
    <div className="backdrop" onClick={ handleClick }>
      <div className="card text-bg-dark border-secondary p-3">
        <h4 className="">Générer une invitation</h4>
        <hr />
          <form>
            <div className="row">
              <div className="col-12" style={{width: "500px"}}>
                <label className="form-label">Veuillez sélectionner un projet dont vous souhaitez obtenir un lien de partage</label>
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
                { errors.project && <div className="form-text text-danger">Veuillez choisir un projet</div> }
              </div>
            </div>

            <button className="btn btn-primary w-100 mt-4 mb-2" onClick={ handleSubmit() } type="submit">Copier l'invitation</button>
          </form>
      </div>
    </div>
  )
};

export default InviteModal;