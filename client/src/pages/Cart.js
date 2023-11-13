import { Fragment, useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SEO from "../components/seo";
import Layout from "../layout/Layout";
import Breadcrumb from "../wrappers/breadcrumb/Breadcrumb";
import { cartWhislistContext } from "../hooks/cartWhislistContext";
import { removeItem, removeAll, totalCart } from "../helpers/cartWishlist";
import CounterProduct from "../components/product/sub-components/CounterProduct";

const Cart = () => {
  let { pathname } = useLocation();
  const { cartWishlist, setCartWishlist } = useContext(cartWhislistContext);
  const { cart } = cartWishlist;
  const [quantityCount, setQuantityCount] = useState(
    cart.reduce((acc, value) => {
      acc[value.id] = value.quantity;
      return acc;
    }, {})
  );

  const cartTotalPrice = totalCart(cart);

  return (
    <Fragment>
      <SEO
        titleTemplate="Panier"
        description="Page panier de la plateforme TheBradery."
      />

      <Layout headerTop="visible">
        <Breadcrumb
          pages={[
            { label: "Shop", path: process.env.PUBLIC_URL + "/" },
            { label: "Panier", path: process.env.PUBLIC_URL + pathname },
          ]}
        />
        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            {cart && cart.length ? (
              <Fragment>
                <h3 className="cart-page-title">Votre Panier</h3>
                <div className="row">
                  <div className="col-12">
                    <div className="table-content table-responsive cart-table-content">
                      <table>
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Nom du Produit</th>
                            <th>Prix</th>
                            <th>Quantité</th>
                            <th>Supprimer</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cart.map((cartItem) => {
                            const finalProductPrice = Number(
                              cartItem.price
                            ).toFixed(2);

                            return (
                              <tr key={cartItem.id}>
                                <td className="product-thumbnail">
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      "/produit/" +
                                      cartItem.id
                                    }
                                  >
                                    <img
                                      className="img-fluid"
                                      src={
                                        process.env.PUBLIC_URL +
                                        `https://picsum.photos/id/${
                                          cartItem.id + 10
                                        }/200/200`
                                      }
                                      alt={cartItem.name}
                                    />
                                  </Link>
                                </td>

                                <td className="product-name d-flex justify-content-center">
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      "/produit/" +
                                      cartItem.id
                                    }
                                  >
                                    {cartItem.name}
                                  </Link>
                                </td>

                                <td className="product-subtotal">
                                  {`${finalProductPrice} €`}
                                </td>
                                <td className="product-quantity">
                                  <CounterProduct
                                    product={cartItem}
                                    cartQuantity={cartItem.quantity}
                                    quantityCount={quantityCount}
                                    setQuantityCount={setQuantityCount}
                                    singleCount={false}
                                    setCartWishlist={setCartWishlist}
                                  ></CounterProduct>
                                </td>
                                <td className="product-remove">
                                  <button
                                    onClick={() => {
                                      removeItem(
                                        cartItem,
                                        "cart",
                                        setCartWishlist
                                      );
                                    }}
                                  >
                                    <i className="fa fa-times"></i>
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="cart-shiping-update-wrapper">
                      <div className="cart-shiping-update">
                        <Link to={process.env.PUBLIC_URL + "/produits"}>
                          Continuez vos Achats
                        </Link>
                      </div>
                      <div className="cart-clear">
                        <button
                          onClick={() => removeAll("cart", setCartWishlist)}
                        >
                          Tout Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-4 offset-lg-4 col-md-12">
                    <div className="grand-totall">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gary-cart">
                          Total
                        </h4>
                      </div>
                      <h5>
                        Total Produits
                        <span>{`${cartTotalPrice.toFixed(2)} €`}</span>
                      </h5>
                      <h5>
                        Livraison
                        <span>{`${(5).toFixed(2)} €`}</span>
                      </h5>

                      <h4 className="grand-totall-title">
                        Total
                        <span>{`${(cartTotalPrice + 5).toFixed(2)} €`}</span>
                      </h4>
                      <Link to={process.env.PUBLIC_URL + "/commande"}>
                        Commande
                      </Link>
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cart"></i>
                    </div>
                    <div className="item-empty-area__text">
                      Aucun Produits dans le Panier <br />
                      <Link to={process.env.PUBLIC_URL + "/"}>
                        Continuez vos Achats
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};

export default Cart;
