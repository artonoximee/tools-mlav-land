import React, { useState } from "react";

function ListItem(props) {
  const { setOpenDeleteModal, setSelectedProject } = props;
  const { id, name, createdAt } = props.project

  function handleClickDelete(e) {
    setSelectedProject(id);
    setOpenDeleteModal(true);
  }

  return (
    <div className="list-group-item list-group-item-action text-bg-dark border-secondary p-3">
      <div className="d-flex w-100 justify-content-between">
        <h5>{ name }</h5>
        <small className="badge rounded-pill text-bg-primary h-50">#{ id.substring(0,7) }</small>
      </div>
      <div className="d-flex w-100 justify-content-between align-items-end">
        <small className="badge rounded-pill text-bg-secondary h-50">{ createdAt.substring(8,10) }/{ createdAt.substring(5,7) }/{ createdAt.substring(0,4) }</small>
        <button onClick={handleClickDelete} className="btn btn-sm btn-outline-danger fw-bold">X</button>
      </div>
    </div>
  )
}

export default ListItem;