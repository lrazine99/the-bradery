import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { cartWhislistContext } from "../../hooks/cartWhislistContext";
import { removeAll } from "../../helpers/cartWishlist";

const CheckoutForm = ({ data }) => {
  const { _, setCartWishlist } = useContext(cartWhislistContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const token = Cookies.get("token");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (!stripe) {
      setIsSubmitting(false);

      return false;
    }

    const cardElement = elements.getElement(CardElement);
    const stripeResponse = await stripe.createToken(cardElement, {
      name: data.buyerUsername,
    });

    const stripeToken = stripeResponse?.token?.id;

    try {
      const response = await axios.post(
        `${process.env.BACK_ENDPOINT}/pay`,
        { stripeToken, ...data },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === "succeeded") {
        toast("paiment reussi votre commande est prise en compte", {
          position: "bottom-left",
        });

        setTimeout(() => {
          removeAll("cart", setCartWishlist);
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      toast(
        "Une erreur est survenue, veuillez verifier vos informations et réessayer",
        {
          position: "bottom-left",
        }
      );

      setIsSubmitting(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="">
          <div className="billing-info mb-20"></div>
          <div>
            <CardElement />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="place-order mt-25">
          <button className="btn-hover" disabled={isSubmitting}>
            Payer
          </button>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
