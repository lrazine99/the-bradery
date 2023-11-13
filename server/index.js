const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const app = express();

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use(cors());
app.use(helmet());
app.use(xss());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(productRoutes);
app.use(userRoutes);
app.use(orderRoutes);

app.all("*", (req, res) => {
  res.status(404).send("Route inexistante");
});

app.listen(process.env.PORT || 3001, () => {
  console.log("Server has started");
});
