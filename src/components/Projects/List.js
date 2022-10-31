/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect} from "react";
import { db } from "../../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";

import ListItem from "./ListItem";
import CreateModal from "./CreateModal";
import UpdateModal from "./UpdateModal";
import DeleteModal from "./DeleteModal";
import sortByCreationDate from "../../helpers/sortByCreationDate";

function List() {
  const { currentUser } = useAuth();
  const [projects, setProjects] = useState();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState();
  const [reload, setReload] = useState(false);

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
      <h4>🏗️ Projets</h4>
      <hr />
      <button onClick={ handleClickCreate } className="btn btn-outline-primary w-100 mb-5">Ajouter un nouveau projet</button>

      <table class="table table-dark">
        <tbody>
          {
            projects &&
            projects.map((project) => (
            <ListItem 
              key={ project.id } 
              project={ project }
              setOpenUpdateModal={ setOpenUpdateModal }
              setOpenDeleteModal={ setOpenDeleteModal }
              setSelectedProject={ setSelectedProject }
            />
            ))
          }
        </tbody>
      </table>

      { openCreateModal && (
        <CreateModal setOpenCreateModal={ setOpenCreateModal } setReload={ setReload } />
      )}

      { openUpdateModal && (
        <UpdateModal setOpenUpdateModal={ setOpenUpdateModal } selectedProject={ selectedProject } setReload={ setReload } />
      )}

      { openDeleteModal && (
        <DeleteModal setOpenDeleteModal={ setOpenDeleteModal } selectedProject={ selectedProject } setReload={ setReload } />
      )}
    </>
  )
}

export default List;