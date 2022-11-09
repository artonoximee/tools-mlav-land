import React, { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";

import CreateModal from "./CreateModal";
import sortByCreationDate from "../../helpers/sortByCreationDate";

function List() {
  const { currentUser } = useAuth();
  const [projects, setProjects] = useState();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [reload, setReload] = useState();

  useEffect(() => {
    getProjects()
  }, [reload])

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

  function handleClickCreate() {
    setOpenCreateModal(true);
  }

  return (
    <>
      <div className="row">
        <div className="col">
          <button onClick={ handleClickCreate } className="btn btn-outline-primary w-100 mb-5">Ajouter un nouveau fichier</button>
        </div>
        <div className="col">
          <button onClick={ null } className="btn btn-outline-primary w-100 mb-5">Générer une invitation</button>
        </div>
      </div>
      

      { openCreateModal && (
        <CreateModal setOpenCreateModal={ setOpenCreateModal } setReload={ setReload } />
      )}
    </>
  )
}

export default List;