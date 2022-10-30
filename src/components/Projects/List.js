import React, { useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import { db } from "../../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";

import ListItem from "./ListItem";
import DeleteModal from "./DeleteModal";
import sortByCreationDate from "../../helpers/sortByCreationDate";

function List() {
  const { currentUser } = useAuth();
  const [projects, setProjects] = useState();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState();

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
    <>
      <h4>🏗️ Projets</h4>
      <hr />
      <Link to="/projects/new" className="btn btn-outline-primary w-100 mb-5">Créer un nouveau projet</Link>

      <div className="list-group">
        {
          projects &&
          projects.map((project) => (
          <ListItem 
            key={ project.id } 
            project={ project }
            setOpenDeleteModal={ setOpenDeleteModal }
            setSelectedProject={ setSelectedProject }
          />
          ))
        }
      </div>

      { openDeleteModal && (
        <DeleteModal setOpenDeleteModal={ setOpenDeleteModal } selectedProject={ selectedProject } />
      )}
    </>
  )
}

export default List;