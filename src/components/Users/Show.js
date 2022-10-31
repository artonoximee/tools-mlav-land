import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "./../../contexts/AuthContext";
import { db } from "../../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

import CreateModal from "./CreateModal";
import UpdateModal from "./UpdateModal";

function Show() {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [user, setUser] = useState();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [reload, setReload] = useState();

  useEffect(() => {
    getUser()
  }, [reload])

  async function getUser() {
    const q = query(collection(db, "users"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    const arr = []
    querySnapshot.forEach((doc) => {
      arr.push(doc.data())
    });
    setUser(arr[0]);
  }

  function handleClickCreate() {
    setOpenCreateModal(true);
  }

  function handleClickUpdate() {
    setOpenUpdateModal(true);
  }

  return (
    <>
      <h4>🧑‍💻 Compte</h4>
      <hr />
      {
        !user &&
        <button onClick={ handleClickCreate } className="btn btn-outline-primary w-100 mb-5">Ajouter des informations</button>
      }
      {
        user &&
        <button onClick={ handleClickUpdate } className="btn btn-outline-primary w-100 mb-5">Modifier les informations</button>
      }
      
      {
        user &&
        <div className="card text-bg-dark border-secondary mb-3">
          <div className="card-body">
            <div className="row">
              <div className="col-1">
                <h1>🧑‍💻</h1>
              </div>
              <div className="col-11">
                {
                  user.firstName !== "" &&
                  <>Prénom : <b>{ user.firstName }</b> <br /></>
                }
                {
                  user.lastName !== "" &&
                  <>Nom : <b>{ user.lastName }</b> <br /></>
                }
                {
                  user.address !== "" &&
                  <>Adresse : <b>{ user.address }</b> <br /></>
                }
                {
                  user.postcode !== "" &&
                  <>Code postal : <b>{ user.postcode }</b> <br /></>
                }
                {
                  user.city !== "" &&
                  <>Ville : <b>{ user.city }</b> <br /></>
                }
                {
                  user.telephone !== "" &&
                  <>Téléphone : <b>{ user.telephone }</b> <br /></>
                }
              </div>
            </div>
          </div>
        </div>
      }

        <div className="card text-bg-dark border-secondary">
          <div className="card-body">
            <div className="row">
              <div className="col-1">
              </div>
              <div className="col-11">
                Email : <b>{ currentUser.email }</b> <br />
              </div>
            </div>
          </div>
        </div>

      { openCreateModal && (
        <CreateModal setOpenCreateModal={ setOpenCreateModal } setReload={ setReload } />
      )}

      { openUpdateModal && (
        <UpdateModal setOpenUpdateModal={ setOpenUpdateModal } user={ user } setReload={ setReload } />
      )}
    </>
  )
}

export default Show;