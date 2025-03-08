import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <h2 className="logo">Movies Bank</h2>

        <nav>
          <ul>
            <li>
              <a href="/home">Accueil</a>
            </li>
            <li>
              <a href="/coups-de-coeur">Mes coups de coeur</a>
            </li>
            <li>
              <a href="/account">Mon compte</a>
            </li>
          </ul>
        </nav>

        <p className="copyright">
          © {new Date().getFullYear()} Movies Bank - Tous droits réservés
        </p>
      </div>
    </footer>
  );
};

export default Footer;
