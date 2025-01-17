import React from "react";
import {useNavigate} from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  }
  return (
    <>
      <div className="row header">
        <div className="col-1 d-flex align-items-start">
          <img src="/images/logo.png" alt="Logo du site" className="logo" />
        </div>
        <div className="col-11 d-flex align-items-center justify-content-end gx-5">
          <button type="button" id="connectButton" className="btn btn-success" onClick={handleLoginClick}>Connexion</button>
        </div>
      </div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid justify-content-center">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#">Accueil</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Réservation</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Films</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Nous connaitre</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Contact</a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Header;