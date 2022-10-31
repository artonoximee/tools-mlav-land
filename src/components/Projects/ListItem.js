import React from "react";

function ListItem(props) {
  const { setOpenUpdateModal, setOpenDeleteModal, setSelectedProject } = props;
  const { id, acronym, name } = props.project

  function handleClickUpdate(e) {
    setSelectedProject({id, acronym, name});
    setOpenUpdateModal(true);
  }

  function handleClickDelete(e) {
    setSelectedProject({id, name});
    setOpenDeleteModal(true);
  }

  return (
    <tr>
      <th scope="row"><span className="badge rounded-pill text-bg-primary">{ acronym }</span></th>
      <td>{ name }</td>
      <td><button onClick={handleClickUpdate} className="btn btn-sm btn-outline-secondary fw-bold float-end">Modifier</button></td>
      <td><button onClick={handleClickDelete} className="btn btn-sm btn-outline-danger fw-bold float-end">X</button></td>
    </tr>
  )
}

export default ListItem;