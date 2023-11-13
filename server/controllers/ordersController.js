const Order = require("../models/Order");
const OrderItems = require("../models/OrderItems");
const Product = require("../models/Product");

const PRIVATE_STRIPE_KEY =
  "sk_test_51Mv1BEGk0I9TXycsuPiiXCBfdWpsvmdZl8w8GyZqsamQx1uK2rG6r4HDNA2EzRZcHW9SKJozQ8m2vVep85GqMfr600LovocVGK";

const stripe = require("stripe")(process.env.PRIVATE_STRIPE_KEY);

exports.newOrder = async (req, res) => {
  const { stripeToken, cart, price, date } = req.body;

  try {
    if (stripeToken && cart && price && date) {
      const response = await stripe.charges.create({
        amount: 2000,
        currency: "eur",
        description: "thebradery order",
        source: stripeToken,
      });

      const newOrder = new Order(req.user.id, price);
      const [{ insertId }] = await newOrder.save();

      cart.forEach((element) => {
        const newInventory = element.inventory - element.quantity;
        const newOrderItems = new OrderItems(
          insertId,
          element.id,
          element.quantity,
          element.price
        );

        newOrderItems.save();

        Product.updateQuantityById(newInventory, element.id);
      });

      res.status(200).json(response);
    } else {
      res
        .status(400)
        .json({ message: "erreur lors du paiement de la commande" });
    }
  } catch (error) {
    res.status(400).json({ message: "erreur lors du paiement de la commande" });
  }
};
