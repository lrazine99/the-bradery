import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import clsx from "clsx";
import MenuCart from "./sub-components/MenuCart";
import { UserContext } from "../../hooks/userContext";
import React, { useContext } from "react";
import { cartWhislistContext } from "../../hooks/cartWhislistContext";

const IconGroup = ({ iconWhiteClass }) => {
  const { cartWishlist } = useContext(cartWhislistContext);
  const { token, handleToken } = useContext(UserContext);

  const handleClick = (e) => {
    e.currentTarget.nextSibling.classList.toggle("active");
  };

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.add("active");
  };

  return (
    <div className={clsx("header-right-wrap", iconWhiteClass)}>
      <div className="same-style account-setting d-none d-lg-block">
        <button
          className="account-setting-active"
          onClick={(e) => handleClick(e)}
        >
          <i className="pe-7s-user-female" />
        </button>
        <div className="account-dropdown">
          <ul>
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
                  Connexion / Inscrire
                </Link>
              )}
            </li>
            {token && (
              <li>
                <Link to={process.env.PUBLIC_URL + "/mon-compte"}>
                  Mon compte
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="same-style header-wishlist">
        <Link to={process.env.PUBLIC_URL + "/wishlist"}>
          <i className="pe-7s-like" />
          <span className="count-style">{cartWishlist.wishlist.length}</span>
        </Link>
      </div>
      <div className="same-style cart-wrap d-none d-lg-block">
        <button className="icon-cart" onClick={(e) => handleClick(e)}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">{cartWishlist.cart.length}</span>
        </button>
        <MenuCart />
      </div>
      <div className="same-style cart-wrap d-block d-lg-none">
        <Link className="icon-cart" to={process.env.PUBLIC_URL + "/panier"}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">{cartWishlist.cart.length}</span>
        </Link>
      </div>
      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button
          className="mobile-aside-button"
          onClick={() => triggerMobileMenu()}
        >
          <i className="pe-7s-menu" />
        </button>
      </div>
    </div>
  );
};

IconGroup.propTypes = {
  iconWhiteClass: PropTypes.string,
};

export default IconGroup;
