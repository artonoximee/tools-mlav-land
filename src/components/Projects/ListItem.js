import React from "react";

function ListItem(props) {
  const { setOpenDeleteModal, setSelectedProject } = props;
  const { id, acronym, name, createdAt } = props.project

  function handleClickDelete(e) {
    setSelectedProject({id, name});
    setOpenDeleteModal(true);
  }

  return (
    <div className="list-group-item list-group-item-action text-bg-dark border-secondary p-3">
      <div className="d-flex w-100 justify-content-between align-items-center">
        <div><h5><span className="badge rounded-pill text-bg-primary">{ acronym }</span> { name }</h5></div>
        <button onClick={handleClickDelete} className="btn btn-sm btn-outline-danger fw-bold">X</button>
      </div>
    </div>
  )
}

export default ListItem;