import React from "react";
import { useForm } from "react-hook-form";
import { db } from "../../config/firebase";
import { doc, deleteDoc } from "firebase/firestore";

function DeleteModal(props) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { setOpenDeleteModal, selectedCounter, setReload } = props;

  function handleClickBackdrop(e) {
    if (e.target.classList.contains('backdrop')) {
      setOpenDeleteModal(null);
    }
  }

  function closeModal() {
    setOpenDeleteModal(null);
  }

  async function deleteProject(data) {
    const counter = doc(db, "counters", data.counterId);
    await deleteDoc(counter);
    setOpenDeleteModal(false);
    setReload(prev => !prev);
  };

  return (
    <div className="backdrop" onClick={ handleClickBackdrop }>
      <div className="card text-bg-dark border-secondary p-3">
        <h4 className="text-danger">Supprimer le compteur</h4>
        <p>Une fois que vous avez supprimé ce compteur, il est impossible de revenir en arrière. Veuillez confirmer la suppression.</p>
        <form>
          <input 
            type="hidden" 
            value={ selectedCounter.id }
            { ...register("counterId", { required: true }) }
          />
          <button className="btn btn-outline-secondary mt-2 me-3" onClick={closeModal}>Annuler</button>
          <button className="btn btn-outline-danger mt-2" onClick={handleSubmit(deleteProject)}>Supprimer</button>          
        </form>
       
      </div>
    </div>
  )
};

export default DeleteModal;