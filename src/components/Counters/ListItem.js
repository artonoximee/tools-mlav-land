import React from "react";

function ListItem(props) {
  const { name, acronym } = props.project;
  const { hours } = props;

  function hoursToDays(hours) {
    return Math.round((hours / 8) * 10) / 10
  }

  return (
    <div className="list-group-item list-group-item-action text-bg-dark border-secondary p-3">
      <div className="row align-items-center">
        <div className="col-lg-8">
          <h6><span className="badge rounded-pill text-bg-primary me-1">{ acronym }</span> { name }</h6>
        </div>
        <div className="col-lg-2">
          <small className="badge rounded-pill text-bg-secondary float-end">{ hours } h</small>
        </div>
        <div className="col-lg-2">
          <small className="badge rounded-pill text-bg-primary float-end">{ hoursToDays(hours) } jour{ hoursToDays(hours) > 1 ? "s" : "" }</small>
        </div>
      </div>
    </div>
  )
}

export default ListItem;