/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

import sortByDay from "../../helpers/sortByDay";

import CreateModal from "./CreateModal";
import DeleteModal from "./DeleteModal";

function Show() {
  const { id } = useParams();
  const [project, setProject] = useState();
  const [counters, setCounters] = useState();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedCounter, setSelectedCounter] = useState();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    getProject()
    getCounters()
  }, [reload])

  async function getProject() {
    const q = query(collection(db, "projects"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    const arr = []
    querySnapshot.forEach((doc) => {
      arr.push(doc.data())
    });
    setProject(arr[0]);
  }

  async function getCounters() {
    const q = query(collection(db, "counters"), where("projectId", "==", id));
    const querySnapshot = await getDocs(q);
    const arr = []
    querySnapshot.forEach((doc) => {
      arr.push(doc.data())
    });
    sortByDay(arr);
    setCounters(arr);
  }

  function sumHours(counters) {
    let sumHours = 0;
    counters.forEach(counter => {
      sumHours += Number(counter.time)
    })
    return Math.round((sumHours / 8) * 10) / 10
  }

  function handleClickCreate() {
    setOpenCreateModal(true);
  }

  function handleClickDelete(counter) {
    setSelectedCounter(counter);
    setOpenDeleteModal(true);
  }

  return (
    <>
    <div className="row">
      <div className="col-2">
        <Link to="/counters" className="btn btn-outline-primary w-100 mb-5"><i className="fa-solid fa-arrow-left"></i> Retour</Link>
      </div>
      <div className="col-8 text-center">
        {
          project && 
          <h4><i className="fa-solid fa-gauge me-2"></i>{ project.name } <span className="badge rounded-pill text-bg-secondary">{ sumHours(counters) }j</span></h4>
        }
      </div>
      <div className="col-2">
        <button onClick={ handleClickCreate } className="btn btn-outline-primary w-100 mb-5"><i className="fa-solid fa-plus"></i> Ajouter</button>
      </div>
    </div>

    {
      counters &&
      counters.map((counter, index) => {
        const d = new Date(counter.day);
        const weekday = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];
        let day = weekday[d.getDay()];
        return (
        <div className="card text-bg-dark border-secondary mb-3" key={ index }>
          <div className="card-body">
            <div className="row">
              <div className="col">
                <h2 className="card-title">{ counter.time }h</h2>
              </div>
              <div className="col">
              <button onClick={ () => handleClickDelete(counter) } className="btn btn-sm btn-outline-danger fw-bold float-end">Supprimer</button>
              </div>
            </div>
            <h6 className="card-subtitle mb-2">{ day } { counter.day.substring(8,10) }/{ counter.day.substring(5,7) }/{ counter.day.substring(0,4) }</h6>
            <h6 className="card-subtitle mb-2 text-muted">{ counter.task }</h6>
          </div>
        </div>
        )
      })
    }

    { openCreateModal && (
      <CreateModal setOpenCreateModal={ setOpenCreateModal } setReload={ setReload } currentProject={ id } />
    )}

    { openDeleteModal && (
      <DeleteModal setOpenDeleteModal={ setOpenDeleteModal } selectedCounter={ selectedCounter } setReload={ setReload } />
    )}
    </>
  )
}

export default Show;