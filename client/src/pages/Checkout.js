import { Fragment, useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SEO from "../components/seo";
import Layout from "../layout/Layout";
import Breadcrumb from "../wrappers/breadcrumb/Breadcrumb";
import { cartWhislistContext } from "../hooks/cartWhislistContext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/cart/CheckoutForm";
import Cookies from "js-cookie";
import { Modal } from "react-bootstrap";
import { totalCart } from "../helpers/cartWishlist";

const Checkout = () => {
  const PUBLIC_STRIPE_KEY =
    "pk_test_51Mv1BEGk0I9TXycscLqSPCp1DASuOBnqOEabJhEGK9G7eDVwz5IzGQShwkzyWubnRftF2QkksYt5lzu966DGUOrk00ULtp9mIF";
  const navigate = useNavigate();
  let { pathname } = useLocation();
  const stripePromise = loadStripe(process.env.REACT_APP_PUBLIC_STRIPE_KEY);
  const { cartWishlist } = useContext(cartWhislistContext);
  const token = Cookies.get("token");
  const username = Cookies.get("username");
  const { cart } = cartWishlist;
  const cartTotalPrice = totalCart(cart);
  const [onShow, setOnShow] = useState(!token);

  const onCloseModal = () => {
    setOnShow(false);
    navigate(process.env.PUBLIC_URL + "/connexion-inscription");
  };

  return (
    <Fragment>
      <SEO
        titleTemplate="Commande"
        description="Page commande de la plateforme TheBradery."
      />
      <Layout headerTop="visible">
        <Breadcrumb
          pages={[
            { label: "Shop", path: process.env.PUBLIC_URL + "/" },
            { label: "Commande", path: process.env.PUBLIC_URL + pathname },
          ]}
        />
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
            {cart && cart.length ? (
              <div className="row">
                <div className=" offset-lg-3 col-lg-6">
                  <div className="your-order-area">
                    <h3 className="text-center">Votre Commande</h3>
                    <div className="your-order-wrap gray-bg-4">
                      <div className="your-order-product-info">
                        <div className="your-order-top">
                          <ul>
                            <li>Produits</li>
                            <li>Total</li>
                          </ul>
                        </div>
                        <div className="your-order-middle">
                          <ul>
                            {cart.map((cartItem) => {
                              const finalProductPrice =
                                cartItem.price.toFixed(2);
                              return (
                                <li key={cartItem.id}>
                                  <span className="order-middle-left">
                                    {cartItem.name}
                                  </span>
                                  <span className="order-price">
                                    {`€${finalProductPrice}`}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        <div className="your-order-bottom">
                          <ul>
                            <li className="your-order-shipping">Shipping</li>
                            <li> {`€${(5).toFixed(2)}`}</li>
                          </ul>
                        </div>
                        <div className="your-order-total">
                          <ul>
                            <li className="order-total">Total</li>
                            <li>{`€${(cartTotalPrice + 5).toFixed(2)}`}</li>
                          </ul>
                        </div>
                      </div>
                      <div className="payment-method">
                        <Elements stripe={stripePromise}>
                          <CheckoutForm
                            data={{
                              buyerUsername: username,
                              cart,
                              price: cartTotalPrice + 5,
                              date: Date.now(),
                            }}
                          ></CheckoutForm>
                        </Elements>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="item-empty-area__text">
                      Aucun Produit dans le Panier <br />
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

      <Modal
        size="sm"
        show={onShow}
        onHide={onCloseModal}
        className="product-quickview-modal-wrapper"
      >
        <Modal.Header closeButton></Modal.Header>

        <div className="modal-body">
          <p className="text-center">
            {"Veuillez vous connecter ou vous inscrire."}
          </p>
        </div>
      </Modal>
    </Fragment>
  );
};

export default Checkout;
