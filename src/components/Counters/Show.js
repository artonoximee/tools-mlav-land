/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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

  function handleClickCreate() {
    setOpenCreateModal(true);
  }

  function handleClickDelete(counter) {
    setSelectedCounter(counter);
    setOpenDeleteModal(true);
  }

  return (
    <>
      
      {
        project && 
        <h4><i className="fa-solid fa-gauge me-2"></i>{ project.name }</h4>
      }
      <hr />
      <button onClick={ handleClickCreate } className="btn btn-outline-primary w-100 mb-5">Ajouter un nouveau temps</button>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">Jour</th>
            <th scope="col">Temps</th>
            <th scope="col">Tâche</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {
            counters &&
            counters.map((counter, index) => {
              const d = new Date(counter.day);
              const weekday = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];
              let day = weekday[d.getDay()];
              return <tr key={counter.id}>
                <td>{ day } { counter.day.substring(8,10) }/{ counter.day.substring(5,7) }/{ counter.day.substring(0,4) }</td>
                <td>{ counter.time }h</td>
                <td>{ counter.task }</td>
                <td><button onClick={ () => handleClickDelete(counter) } className="btn btn-sm btn-outline-danger fw-bold float-end">X</button></td>
              </tr>
            })
          }
        </tbody>
      </table>

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