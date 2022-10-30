import React from "react";
import "./DeleteModal.css";

function DeleteModal(props) {
  const { setOpenDeleteModal, selectedProject } = props;

  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      setOpenDeleteModal(null);
    }
  }

  return (
    <div className="backdrop" onClick={ handleClick }>
      <div className="card text-bg-dark border-danger">
        <p className="card-body">
          { selectedProject }
        </p>
      </div>
    </div>
  )
};

export default DeleteModal;