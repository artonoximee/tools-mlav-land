import React from "react";
import { Link } from "react-router-dom";

function ListItem(props) {
  const invoice = props.invoice

  const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  });

  return (
    <div className="card text-bg-dark border-secondary mb-4">
      <div className="card-body">
        <div className="row mt-1">
          <div className="col">
              <span className="d-inline-flex px-2 py-1 fw-semibold text-primary bg-primary bg-opacity-10 border border-primary border-opacity-10 rounded-2" aria-disabled="true">
                { invoice.createdAt.substring(8,10) }/{ invoice.createdAt.substring(5,7) }/{ invoice.createdAt.substring(0,4) }
              </span>
          </div>
          <div className="col text-center">
            <span className="d-inline-flex px-2 py-1 fw-semibold text-primary bg-primary bg-opacity-10 border border-primary border-opacity-10 rounded-2" aria-disabled="true">
              { formatter.format(invoice.total) }
            </span>
            <br />
            <small className="text-muted">{ invoice.name }</small>
          </div>
          <div className="col text-end">
            <Link to={`/invoices/${invoice.id}`} className="btn btn-sm btn-outline-primary me-2 text-primary bg-primary bg-opacity-10 border border-primary border-opacity-10 rounded-2" type="button">
              <i className="fa-solid fa-file-pdf"></i>
            </Link>
            <span className="dropdown">
              <button className="btn btn-sm btn-outline-primary text-primary bg-primary bg-opacity-10 border border-primary border-opacity-10 rounded-2 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="fa-solid fa-gear"></i>
              </button>
              <ul className="dropdown-menu dropdown-menu-dark">
                <li><a className="dropdown-item" href="#">Modifier</a></li>
                <li><a className="dropdown-item" href="#">Supprimer</a></li>
              </ul>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListItem;