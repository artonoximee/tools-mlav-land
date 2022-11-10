/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

function ListItem(props) {
  const transfer = props.transfer;

  return (
    <div className="card text-bg-dark border-secondary mt-4">
      <div className="card-body">
        <div className="row mt-1 mb-1">
          <div className="col-3">
              {
                transfer.phase !== "" &&
                <span className="d-inline-flex px-2 py-1 ms-2 fw-semibold text-primary bg-primary bg-opacity-10 border border-primary border-opacity-10 rounded-2" aria-disabled="true">
                  { transfer.phase }
                </span>
              }
              {
                transfer.version !== "" &&
                <span className="d-inline-flex px-2 py-1 ms-2 fw-semibold text-info bg-info bg-opacity-10 border border-info border-opacity-10 rounded-2" aria-disabled="true">
                  { transfer.version }
                </span>
              }
              <span className="d-inline-flex px-2 py-1 ms-lg-2 ms-md-0 fw-semibold text-primary bg-primary bg-opacity-10 border border-primary border-opacity-10 rounded-2" aria-disabled="true">
                { transfer.createdAt.substring(8,10) }/{ transfer.createdAt.substring(5,7) }/{ transfer.createdAt.substring(0,4) }
              </span>
          </div>
          <div className="col">
            <span className="d-inline-flex px-2 py-1" aria-disabled="true">
            { transfer.name }
            </span>
          </div>
          <div className="col-2 text-end">
            <a href={`${transfer.fileUrl}`} className="btn btn-sm btn-outline-primary me-2 text-primary bg-primary bg-opacity-10 border border-primary border-opacity-10 rounded-2" type="button">
              <i className="fa-solid fa-file"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListItem;