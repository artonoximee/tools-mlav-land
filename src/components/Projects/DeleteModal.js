import React from "react";
import { useForm } from "react-hook-form";
import { db } from "../../config/firebase";
import { doc, deleteDoc } from "firebase/firestore";

function DeleteModal(props) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { setOpenDeleteModal, selectedProject, setReload } = props;

  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      setOpenDeleteModal(null);
    }
  }

  async function deleteProject(data) {
    if (data.delete === "EFFACER") {
      const project = doc(db, "projects", data.projectId);
      await deleteDoc(project);
      setOpenDeleteModal(false);
      setReload(prev => !prev);
    }
  };

  return (
    <div className="backdrop" onClick={ handleClick }>
      <div className="card text-bg-dark border-danger p-3">
        <h4 className="text-danger">Supprimer le projet</h4>
        <p>Une fois que vous avez supprimé le projet <strong className="text-danger">{ selectedProject.name }</strong>, il est impossible de revenir en arrière. Soyez-en sûr. Veuillez taper <span className="font-monospace text-danger">EFFACER</span> pour confirmer l'action.</p>
        <form>
          <input 
            type="hidden" 
            value={ selectedProject.id }
            { ...register("projectId", { required: true }) }
          />
          <div className="input-group mb-3">
              <input 
                type="text"
                id="delete"
                className={ `form-control border-secondary text-bg-dark mt-2 ${ errors.delete && "is-invalid border-danger" }` }
                placeholder="EFFACER"
                { ...register("delete", { required: true }) }
              />
              <button className="btn btn-outline-danger mt-2" onClick={handleSubmit(deleteProject)}>Envoyer</button>
          </div>
          { errors.delete && <div className="form-text text-danger">Veuillez entrer "EFFACER" pour confirmer la suppression</div>}
          
        </form>
       
      </div>
    </div>
  )
};

export default DeleteModal;