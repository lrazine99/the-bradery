import { Fragment, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import SEO from "../components/seo";
import Layout from "../layout/Layout";
import Breadcrumb from "../wrappers/breadcrumb/Breadcrumb";
import { cartWhislistContext } from "../hooks/cartWhislistContext";
import {
  addItem,
  findItem,
  removeItem,
  removeAll,
} from "../helpers/cartWishlist";

const Wishlist = () => {
  let { pathname } = useLocation();
  const { cartWishlist, setCartWishlist } = useContext(cartWhislistContext);
  const { wishlist } = cartWishlist;

  return (
    <Fragment>
      <SEO
        titleTemplate="Wishlist"
        description="Page Wishlist qui affiche un les produits enregistrés par l'utilisateur sur la plateforme TheBradery."
      />
      <Layout headerTop="visible">
        <Breadcrumb
          pages={[
            { label: "Shop", path: process.env.PUBLIC_URL + "/" },
            { label: "Wishlist", path: process.env.PUBLIC_URL + pathname },
          ]}
        />
        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            {wishlist && wishlist.length ? (
              <Fragment>
                <h3 className="cart-page-title">Vos produits</h3>
                <div className="row">
                  <div className="col-12">
                    <div className="table-content table-responsive cart-table-content">
                      <table>
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Nom du Produit</th>
                            <th>Prix</th>
                            <th>Ajouter Au Panier</th>
                            <th>Supprimer</th>
                          </tr>
                        </thead>
                        <tbody>
                          {wishlist.map((wishlistItem) => {
                            const finalProductPrice = wishlistItem.price;

                            const cartItem = findItem(
                              wishlistItem,
                              "cart",
                              cartWishlist
                            );

                            return (
                              <tr key={wishlistItem.id}>
                                <td className="product-thumbnail">
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      "/produit/" +
                                      wishlistItem.id
                                    }
                                  >
                                    <img
                                      className="img-fluid"
                                      src={
                                        process.env.PUBLIC_URL +
                                        `https://picsum.photos/id/${
                                          wishlistItem.id + 10
                                        }/200/200`
                                      }
                                      alt={wishlistItem.name}
                                    />
                                  </Link>
                                </td>

                                <td className="product-name text-center">
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      "/produit/" +
                                      wishlistItem.id
                                    }
                                  >
                                    {wishlistItem.name}
                                  </Link>
                                </td>

                                <td className="product-price-cart">
                                  <span className="amount">
                                    {`€${finalProductPrice}`}
                                  </span>
                                </td>

                                <td className="product-wishlist-cart">
                                  {!cartItem ? (
                                    <button
                                      onClick={() =>
                                        addItem(
                                          wishlistItem,
                                          "cart",
                                          setCartWishlist
                                        )
                                      }
                                      className={cartItem ? "active" : ""}
                                      disabled={cartItem}
                                      title={
                                        cartItem
                                          ? "Dans le panier"
                                          : "Ajouter au panier"
                                      }
                                    >
                                      {" "}
                                      <i className="pe-7s-cart"></i>{" "}
                                      {cartItem
                                        ? "Ajouté"
                                        : "Ajouter au panier"}
                                    </button>
                                  ) : (
                                    <button disabled className="active">
                                      Dans le Panier
                                    </button>
                                  )}
                                </td>

                                <td className="product-remove">
                                  <button
                                    onClick={() =>
                                      removeItem(
                                        wishlistItem,
                                        "wishlist",
                                        setCartWishlist
                                      )
                                    }
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
                        <Link to={process.env.PUBLIC_URL + "/"}>
                          Continuez vos achats
                        </Link>
                      </div>
                      <div className="cart-clear">
                        <button
                          onClick={() => removeAll("wishlist", setCartWishlist)}
                        >
                          Tout supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-like"></i>
                    </div>
                    <div className="item-empty-area__text">
                      Aucun Produits dans la liste de souhait <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/"}>
                        Ajouter des Produits
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

export default Wishlist;
