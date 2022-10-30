import React from "react";
import { Link } from "react-router-dom";

function ListItem(props) {
  const { id, name, acronym } = props.project;
  const { hours } = props;

  function hoursToDays(hours) {
    return Math.round((hours / 8) * 10) / 10
  }

  return (
    <tr>
      <th scope="row"><span className="badge rounded-pill text-bg-primary">{ acronym }</span></th>
      <td><Link to={ `/counters/${ id }` } className="text-light">{ name }</Link></td>
      <td><small className="badge rounded-pill text-bg-secondary float-end">{ hours } h</small></td>
      <td><small className="badge rounded-pill text-bg-primary float-end">{ hoursToDays(hours) } jour{ hoursToDays(hours) > 1 ? "s" : "" }</small></td>
    </tr>
  )
}

export default ListItem;