/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";

import CreateModal from "./CreateModal";
import InviteModal from "./InviteModal";
import ListItem from "./ListItem";
import Search from "./Search";
import sortByCreationDate from "../../helpers/sortByCreationDate";

function List() {
  const { currentUser } = useAuth();
  const [projects, setProjects] = useState();
  const [transfers, setTransfers] = useState();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openInviteModal, setOpenInviteModal] = useState(false);
  const [reload, setReload] = useState();
  const [filteredTransfers, setFilteredTransfers] = useState();
  const [selectedProject, setSelectedProject] = useState("");

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
    setFilteredTransfers(arr);
  }

  function handleClickCreate() {
    setOpenCreateModal(true);
  }

  function handleClickInvite() {
    setOpenInviteModal(true);
  }

  function handleChange(e) {
    const { value } = e.target;
    setSelectedProject(value);
  }

  return (
    <>
      <div className="row">
        <div className="col">
          <button onClick={ handleClickCreate } className="btn btn-outline-primary w-100 mb-5">Ajouter un nouveau fichier</button>
        </div>
        <div className="col">
          <button onClick={ handleClickInvite } className="btn btn-outline-primary w-100 mb-5">G??n??rer une invitation</button>
        </div>
      </div>

      {
        projects && <Search projects={ projects } handleChange={ (e) => handleChange(e) }/>
      }
      
      {
        filteredTransfers &&
        filteredTransfers.map(transfer => {
          if (selectedProject === transfer.projectId) {
            return <ListItem key={ transfer.id } transfer={ transfer } projects={ projects } />
          } else if (selectedProject === "") {
            return <ListItem key={ transfer.id } transfer={ transfer } projects={ projects } />
          }
        })
      }
      
      { openCreateModal && (
        <CreateModal setOpenCreateModal={ setOpenCreateModal } setReload={ setReload } />
      )}

      { openInviteModal && (
        <InviteModal setOpenInviteModal={ setOpenInviteModal } />
      )}
    </>
  )
}

export default List;