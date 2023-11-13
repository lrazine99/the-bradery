import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { cartWhislistContext } from "../../../hooks/cartWhislistContext";
import { removeItem } from "../../../helpers/cartWishlist";

const MenuCart = () => {
  const { cartWishlist, setCartWishlist } = useContext(cartWhislistContext);
  const { cart } = cartWishlist;
  const cartTotalPrice = cart.reduce((acc, product) => acc + product.price, 0);

  return (
    <div className="shopping-cart-content">
      {cart && cart.length ? (
        <Fragment>
          <ul>
            {cart.map((item) => {
              const finalProductPrice = Number(item.price);

              return (
                <li className="single-shopping-cart" key={item.id}>
                  <div className="shopping-cart-img">
                    <Link to={process.env.PUBLIC_URL + "/produit/" + item.id}>
                      <img
                        alt={item.name}
                        src={
                          process.env.PUBLIC_URL +
                          `https://picsum.photos/id/${item.id + 10}/200/200`
                        }
                        className="img-fluid"
                      />
                    </Link>
                  </div>
                  <div className="shopping-cart-title">
                    <h4>
                      <Link to={process.env.PUBLIC_URL + "/Shop/" + item.id}>
                        {item.name}
                      </Link>
                    </h4>
                    <h6>Qty: {item.quantity}</h6>
                    <span>{`${finalProductPrice} €`}</span>
                  </div>
                  <div className="shopping-cart-delete">
                    <button
                      onClick={() => removeItem(item, "cart", setCartWishlist)}
                    >
                      <i className="fa fa-times-circle" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="shopping-cart-total">
            <h4>
              Total :<span className="shop-total">{`${cartTotalPrice} €`}</span>
            </h4>
          </div>
          <div className="shopping-cart-btn btn-hover text-center">
            <Link
              className="default-btn"
              to={process.env.PUBLIC_URL + "/panier"}
            >
              Panier
            </Link>
            <Link
              className="default-btn"
              to={process.env.PUBLIC_URL + "/commande"}
            >
              Commande
            </Link>
          </div>
        </Fragment>
      ) : (
        <p className="text-center">Aucun Produits dans le Panier</p>
      )}
    </div>
  );
};

export default MenuCart;
