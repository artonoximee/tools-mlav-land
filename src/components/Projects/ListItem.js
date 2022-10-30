import React from "react";

function ListItem(props) {
  const { setOpenDeleteModal, setSelectedProject } = props;
  const { id, acronym, name } = props.project

  function handleClickDelete(e) {
    setSelectedProject({id, name});
    setOpenDeleteModal(true);
  }

  return (
    <tr>
      <th scope="row"><span className="badge rounded-pill text-bg-primary">{ acronym }</span></th>
      <td>{ name }</td>
      <td><button onClick={handleClickDelete} className="btn btn-sm btn-outline-danger fw-bold float-end">X</button></td>
    </tr>
  )
}

export default ListItem;