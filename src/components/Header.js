import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Header = ({ setUser, userToken }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {/* Version Desktop */}
      {!isMobile && (
        <div className="header">
          {/* NAV */}
          <nav className="desktop-nav">
            {userToken ? (
              <ul>
                <li>
                  <NavLink to="/home">Accueil</NavLink>
                </li>
                <li>
                  <NavLink to="/coups-de-coeur">Coups de coeur</NavLink>
                </li>
                <li>
                  <NavLink to="/wishlist">Ma wishlist</NavLink>
                </li>
              </ul>
            ) : (
              <ul>
                {/* <li>
                  <NavLink to="/">Accueil</NavLink>
                </li> */}
              </ul>
            )}
          </nav>

          {/* LOGO */}
          <h1>Movies Bank</h1>

          {!userToken && (
            <h2
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "30px",
              }}
            >
              L'Application des cinéphiles
            </h2>
          )}

          {/* CONNEXION */}
          {userToken ? (
            <ul className="login">
              <li>
                <NavLink to="/account">Mon compte</NavLink>
              </li>
              <li>
                <NavLink
                  to="/"
                  onClick={() => {
                    setUser(null);
                  }}
                >
                  Se déconnecter
                </NavLink>
              </li>
            </ul>
          ) : (
            <ul></ul>
          )}
        </div>
      )}

      {/* Version Mobile */}
      {isMobile && (
        <div className="header">
          <div class="content">
            <nav className="mobile-nav">
              {userToken && (
                <>
                  <input type="checkbox" id="hamburger1" />
                  <label for="hamburger1"></label>
                </>
              )}

              <ul class="nav-links">
                <li>
                  <NavLink to="/home">Accueil</NavLink>
                </li>
                <li>
                  <NavLink to="/coups-de-coeur">Coups de coeur</NavLink>
                </li>
                <li>
                  <NavLink to="/wishlist">Ma wishlist</NavLink>
                </li>
                <li>
                  <NavLink to="/account">Mon compte</NavLink>
                </li>
                <li>
                  <NavLink
                    to="/"
                    onClick={() => {
                      setUser(null);
                    }}
                  >
                    Se déconnecter
                  </NavLink>
                </li>
              </ul>

              {/* LOGO */}
              <h1 className="mobile-logo">Movies Bank</h1>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
