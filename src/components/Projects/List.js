import React from "react";
import { Link } from 'react-router-dom';

function List() {
  return (
    <>
      <h4>🏗️ Projets</h4>
      <hr />
      <Link to="/projects/new" className="btn btn-outline-primary w-100 mb-5">Créer un nouveau projet</Link>
    </>
  )
}

export default List;