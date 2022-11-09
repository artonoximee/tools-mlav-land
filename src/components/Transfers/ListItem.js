import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

function ListItem(props) {
  // const { setOpenUpdateModal, setOpenDeleteModal, setSelectedProject } = props;
  const transfer = props.transfer;
  const projects = props.projects;
  const [currentProject, setCurrentProject] = useState();

  useEffect(() => {
    projects.forEach(project => {
      if (transfer.projectId === project.id) {
        setCurrentProject(project);
      }
    })
  }, [])

  // function handleClickUpdate(e) {
  //   setSelectedProject({id, acronym, name});
  //   setOpenUpdateModal(true);
  // }

  // function handleClickDelete(e) {
  //   setSelectedProject({id, name});
  //   setOpenDeleteModal(true);
  // }

  return (
    <div className="card text-bg-dark border-secondary mb-4">
      <div className="card-body">
        <div className="row mt-1 mb-1">
          <div className="col-2">
              <span className="d-inline-flex px-2 py-1 fw-semibold text-primary bg-primary bg-opacity-10 border border-primary border-opacity-10 rounded-2" aria-disabled="true">
              { currentProject && currentProject.acronym }
              </span>
              <span className="d-inline-flex px-2 py-1 ms-2 fw-semibold text-primary bg-primary bg-opacity-10 border border-primary border-opacity-10 rounded-2" aria-disabled="true">
              { transfer.createdAt.substring(8,10) }/{ transfer.createdAt.substring(5,7) }/{ transfer.createdAt.substring(0,4) }
              </span>
          </div>
          <div className="col">
            <span className="d-inline-flex px-2 py-1" aria-disabled="true">
            { transfer.name }
            </span>
          </div>
          <div className="col text-end">
            <a href={`${transfer.fileUrl}`} className="btn btn-sm btn-outline-primary me-2 text-primary bg-primary bg-opacity-10 border border-primary border-opacity-10 rounded-2" type="button">
            <i className="fa-solid fa-file"></i>
            </a>
            <span className="dropdown">
              <button className="btn btn-sm btn-outline-primary text-primary bg-primary bg-opacity-10 border border-primary border-opacity-10 rounded-2 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="fa-solid fa-gear"></i>
              </button>
              {/* <ul className="dropdown-menu dropdown-menu-dark">
                <li><Link onClick={handleClickUpdate} className="dropdown-item">Modifier</Link></li>
                <li><Link onClick={handleClickDelete} className="dropdown-item">Supprimer</Link></li>
              </ul> */}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListItem;