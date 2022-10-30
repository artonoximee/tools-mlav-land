import React from "react";

function ListItem(props) {
  const { id, name, createdAt } = props.project

  return (
    <div className="list-group-item list-group-item-action text-bg-dark border-secondary p-3">
      <div className="d-flex w-100 justify-content-between">
        <h5>{ name }</h5>
        <small className="badge rounded-pill text-bg-primary h-50">#{ id.substring(0,7) }</small>
      </div>
      <small className="badge rounded-pill text-bg-secondary">{ createdAt.substring(8,10) }/{ createdAt.substring(5,7) }/{ createdAt.substring(0,4) }</small>
    </div>
  )
}

export default ListItem;