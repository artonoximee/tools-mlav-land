import React, { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";

import CreateModal from "./CreateModal";
import ListItem from "./ListItem";
import sortByCreationDate from "../../helpers/sortByCreationDate";

function List() {
  const { currentUser } = useAuth();
  const [projects, setProjects] = useState();
  const [transfers, setTransfers] = useState();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [reload, setReload] = useState();

  useEffect(() => {
    getProjects()
    getTransfers()
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

  async function getTransfers() {
    const q = query(collection(db, "transfers"), where("userId", "==", currentUser.uid));
    const querySnapshot = await getDocs(q);
    const arr = []
    querySnapshot.forEach((doc) => {
      arr.push(doc.data())
    });
    sortByCreationDate(arr);
    setTransfers(arr);
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

      {
        transfers &&
        transfers.map(transfer => <ListItem key={ transfer.id } transfer={ transfer } projects={ projects } />)
      }
      
      { openCreateModal && (
        <CreateModal setOpenCreateModal={ setOpenCreateModal } setReload={ setReload } />
      )}
    </>
  )
}

export default List;