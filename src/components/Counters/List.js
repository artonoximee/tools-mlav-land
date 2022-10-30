import React from "react";
import { Link } from "react-router-dom";

function List() {
  return (
    <>
      <h4>⏱️ Compteur</h4>
      <hr />
      <Link to="/counters/new" className="btn btn-outline-primary w-100 mb-5">Ajouter un nouveau temps</Link>
    </>
  )
}

export default List;