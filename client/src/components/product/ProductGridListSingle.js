import PropTypes from "prop-types";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { findItem, addItem } from "../../helpers/cartWishlist";

const ProductGridListSingle = ({
  product,
  spaceBottomClass,
  cartWishlist,
  setCartWishlist,
}) => {
  const finalProductPrice = product?.price.toFixed(2);
  const cartItem = findItem(product, "cart", cartWishlist);
  const isValidCartItem = cartItem && cartItem?.quantity === product.inventory;
  const wishlistItem = findItem(product, "wishlist", cartWishlist);

  return (
    <Fragment>
      <div className={clsx("product-wrap", spaceBottomClass)}>
        <div className="product-img">
          <Link to={process.env.PUBLIC_URL + "/produit/" + product?.id}>
            <img
              className="default-img"
              src={
                process.env.PUBLIC_URL +
                `https://picsum.photos/id/${product.id + 10}/200/200`
              }
              alt={`Shop ${product.name}`}
              height="200"
            />
          </Link>

          <div className="product-action">
            <div className="pro-same-action pro-wishlist">
              <button
                className={wishlistItem ? "active" : ""}
                disabled={wishlistItem}
                title={
                  wishlistItem
                    ? "Dans la liste de souhait"
                    : "Ajouter à la liste de souhait"
                }
                onClick={() => addItem(product, "wishlist", setCartWishlist)}
              >
                <i className="pe-7s-like" />
              </button>
            </div>
            <div className="pro-same-action pro-cart">
              {!isValidCartItem ? (
                <button
                  onClick={() => addItem(product, "cart", setCartWishlist)}
                  className={isValidCartItem ? "active" : ""}
                  disabled={isValidCartItem}
                  title={
                    isValidCartItem ? "Dans le panier" : "Ajouter au panier"
                  }
                >
                  {" "}
                  <i className="pe-7s-cart"></i>{" "}
                  {isValidCartItem ? "Ajouté" : "Ajouter au panier"}
                </button>
              ) : (
                <button disabled className="active">
                  En rupture de stock
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="product-content text-center">
          <h3>
            <Link to={process.env.PUBLIC_URL + "/Shop/" + product?.id}>
              {product?.name}
            </Link>
          </h3>

          <div className="product-price">
            <span>{`${finalProductPrice} €`}</span>
          </div>
        </div>
      </div>
      <div className="shop-list-wrap mb-30">
        <div className="row">
          <div className="col-xl-4 col-md-5 col-sm-6">
            <div className="product-list-image-wrap">
              <div className="product-img">
                <Link to={process.env.PUBLIC_URL + "/Shop/" + product?.id}>
                  <img
                    className="default-img img-fluid"
                    src={
                      process.env.PUBLIC_URL + "https://picsum.photos//200/200"
                    }
                    alt={`Shop ${product.name}`}
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-xl-8 col-md-7 col-sm-6">
            <div className="shop-list-content">
              <h3>
                <Link to={process.env.PUBLIC_URL + "/Shop/" + product?.id}>
                  {product?.name}
                </Link>
              </h3>
              <div className="product-list-price">
                <span>{`${finalProductPrice} €`} </span>
              </div>

              <div className="shop-list-actions d-flex align-items-center">
                <div className="shop-list-btn btn-hover">
                  {!cartItem ? (
                    <button
                      onClick={() => addItem(product, "cart", setCartWishlist)}
                      className={cartItem ? "active" : ""}
                      disabled={cartItem}
                      title={cartItem ? "Dans le panier" : "Ajouter au panier"}
                    >
                      {" "}
                      <i className="pe-7s-cart"></i>{" "}
                      {cartItem ? "Ajouté" : "Ajouter au panier"}
                    </button>
                  ) : (
                    <button disabled className="active">
                      Dans le Panier
                    </button>
                  )}
                </div>

                <div className="shop-list-wishlist ml-10">
                  <button
                    className={wishlistItem ? "active" : ""}
                    disabled={wishlistItem}
                    title={
                      wishlistItem
                        ? "Dans la liste de souhait"
                        : "Ajouter à la liste de souhait"
                    }
                    onClick={() =>
                      addItem(product, "wishlist", setCartWishlist)
                    }
                  >
                    <i className="pe-7s-like" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

ProductGridListSingle.propTypes = {
  product: PropTypes.shape({}),
  spaceBottomClass: PropTypes.string,
  cartWishlist: PropTypes.shape({}),
  setCartWishlist: PropTypes.func,
};

export default ProductGridListSingle;
