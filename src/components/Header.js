import React from "react";
import { NavLink } from "react-router-dom";

const Header = ({ setUser, userToken }) => {
  return (
    <div className="header">
      {/* NAV */}
      <nav>
        {userToken ? (
          <ul>
            <li>
              <NavLink
                to="/"
                className={(nav) => (nav.isActive ? "nav-active" : "")}
              >
                Accueil
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/coups-de-coeur"
                className={(nav) => (nav.isActive ? "nav-active" : "")}
              >
                Coups de coeur
              </NavLink>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <NavLink
                to="/"
                className={(nav) => (nav.isActive ? "nav-active" : "")}
              >
                Accueil
              </NavLink>
            </li>
          </ul>
        )}
      </nav>

      {/* LOGO */}
      <h1>Movies Bank</h1>

      {/* CONNEXION */}

      {userToken ? (
        <ul className="login">
          <li>
            <NavLink
              to="/account"
              className={(nav) => (nav.isActive ? "nav-active" : "")}
            >
              Mon compte
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className={(nav) => (nav.isActive ? "nav-active" : "")}
              onClick={() => {
                setUser(null);
              }}
            >
              Se déconnecter
            </NavLink>
          </li>
        </ul>
      ) : (
        <ul className="login">
          <li>
            <NavLink
              to="/signup"
              className={(nav) => (nav.isActive ? "nav-active" : "")}
            >
              S'incrire
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className={(nav) => (nav.isActive ? "nav-active" : "")}
            >
              Se connecter
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Header;
