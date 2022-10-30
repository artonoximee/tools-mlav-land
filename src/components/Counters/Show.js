import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { db } from "../../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

import DeleteModal from "./DeleteModal";

function Show() {
  const { id } = useParams();
  const [project, setProject] = useState();
  const [counters, setCounters] = useState();
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
    setCounters(arr);
  }

  function handleClickDelete(counter) {
    setSelectedCounter(counter);
    setOpenDeleteModal(true);
  }

  return (
    <>
      
      {
        project && 
        <h4>⏱️ Compteurs - <strong>{ project.name }</strong></h4>
      }
      <hr />
      <Link to="/counters/new" className="btn btn-outline-primary w-100 mb-5">Ajouter un nouveau temps</Link>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Temps</th>
            <th scope="col">Date d'ajout</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {
            counters &&
            counters.map((counter, index) => (
              <tr key={counter.id}>
                <th scope="row">{ index }</th>
                <td>{ counter.time }h</td>
                <td>{ counter.createdAt.substring(8,10) }/{ counter.createdAt.substring(5,7) }/{ counter.createdAt.substring(0,4) }</td>
                <td><button onClick={ () => handleClickDelete(counter) } className="btn btn-sm btn-outline-danger fw-bold float-end">X</button></td>
              </tr>
            ))
          }
        </tbody>
      </table>

      { openDeleteModal && (
        <DeleteModal setOpenDeleteModal={ setOpenDeleteModal } selectedCounter={ selectedCounter } setReload={ setReload } />
      )}
    </>
  )
}

export default Show;