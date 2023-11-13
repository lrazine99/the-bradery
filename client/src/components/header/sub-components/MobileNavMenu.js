import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { UserContext } from "../../../hooks/userContext";

const MobileNavMenu = () => {
  const { token, handleToken } = useContext(UserContext);

  return (
    <nav className="offcanvas-navigation" id="offcanvas-navigation">
      <ul>
        <li>
          <Link to={process.env.PUBLIC_URL + "/"}>Shop</Link>
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + "/panier"}>Panier</Link>
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + "/commande"}>Commande</Link>
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + "/wishlist"}>
            Liste de Souhait
          </Link>
        </li>
        <li>
          {token ? (
            <Link
              onClick={() => handleToken(null)}
              to={process.env.PUBLIC_URL + "/"}
            >
              Deconnexion
            </Link>
          ) : (
            <Link to={process.env.PUBLIC_URL + "/connexion-inscription"}>
              Connexion / S'inscrire
            </Link>
          )}
        </li>
        
      </ul>
    </nav>
  );
};

export default MobileNavMenu;
