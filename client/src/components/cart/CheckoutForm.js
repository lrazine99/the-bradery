import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useState } from "react";

const CheckoutForm = ({ data }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const token = Cookies.get("token");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (!stripe) {
      setIsSubmitting(false);

      return false;
    }

    const cardElement = elements.getElement(CardElement);
    const stripeResponse = await stripe.createToken(cardElement, {
      name: data.buyer,
    });

    const stripeToken = stripeResponse?.token?.id;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACK_ENDPOINT}/pay`,
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
          window.location.reload(false);
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
