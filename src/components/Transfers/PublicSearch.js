import React from "react";

function PublicSearch(props) {
  return (
    <>
      <input 
        type="text"
        id="name"
        className={ `form-control form-control-lg text-bg-dark` }
        placeholder="Code projet"
        onChange={ props.handleChange }
      />
    </>
  )
}

export default PublicSearch;