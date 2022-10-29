import React from "react";
import { Link } from "react-router-dom";

function Item(props) {
  const { id, name, createdAt } = props.invoice

  const day = createdAt[8] + createdAt[9]
  const month = createdAt[5] + createdAt[6]
  const year = createdAt[2] + createdAt[3]

  return (
    <Link to="#" className="list-group-item list-group-item-action text-bg-dark border-secondary p-3">
      <div className="d-flex w-100 justify-content-between">
        <h5>{ name }</h5>
        <small className="badge text-bg-primary h-50">{ day }/{ month }/{ year }</small>
      </div>
      <small className="text-muted"># { id }</small>
    </Link>
  )
}

export default Item;