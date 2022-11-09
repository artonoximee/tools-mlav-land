import React from "react";

function Search(props) {
  const projects = props.projects;

  const optionsProject = projects.map(project => 
    <option key={project.id} value={project.id}>{project.acronym} - {project.name}</option>
  )

  return (
    <>
      <select 
        id="project" 
        className={`form-control mb-5 text-bg-dark border-secondary`}
        name="project"
        onChange={props.handleChange}
      >
        <option value="">Tous les projets</option>
        {optionsProject}
      </select>
    </>
  )
}

export default Search;