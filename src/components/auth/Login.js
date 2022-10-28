import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/AuthContext";

import { BoxArrowInRight } from 'react-bootstrap-icons';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { logIn } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function submitLogIn(data) {
    try {
      setError("");
      setLoading(true);
      await logIn(data.email, data.password);
      navigate("/dashboard");
    } catch (err) {
      setError("Échec de la connexion");
    }
    setLoading(false);
  }

  return (
    <div className="row justify-content-center top-margin">
      <div className="col-lg-3 col-md-12">
        <h1 className="text-center"><span class="badge rounded-pill text-bg-primary">🛠️</span></h1>
        <h3 className="mb-5 text-center">Connexion</h3>

        { error && <div className="alert alert-warning mt-1 border-warning">💣 { error }</div> }

        <label htmlFor="email" className="form-label mt-1"><i className="fa-solid fa-envelope text-primary"></i> Email</label>
        <input 
          type="email"
          id="email"
          className={ `form-control text-bg-dark border-secondary ${ errors.email && "is-invalid border-danger" }` }
          placeholder="Adresse email"
          { ...register("email", { required: true, pattern: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i }) }
        />
        { errors.email && <div className="form-text text-danger">Merci de renseigner votre adresse email pour vous connecter</div> }

        <label htmlFor="password" className="form-label mt-3"><i className="fa-sharp fa-solid fa-key text-primary"></i> Mot de passe</label>
        <input 
          type="password"
          id="password"
          className={ `form-control text-bg-dark border-secondary ${ errors.password && "is-invalid border-danger" }` }
          placeholder="Mot de passe"
          { ...register("password", { required: true, minLength: 6 }) }
        />
        { errors.password && <div className="form-text text-danger">Votre mot de passe doit au minimum contenir 6 caractères.</div> }
        
      
        <div className="d-grid gap-2">
          <button className={ `btn mt-5 btn-outline-primary` } onClick={ handleSubmit(submitLogIn) } disabled={ loading } type="submit">Connexion</button>
        </div>

        <div className=" bottom-margin"></div>
      </div>
    </div>
  )
}

export default Login;