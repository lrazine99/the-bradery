const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const app = express();

const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')

app.use(cors());
app.use(helmet());
app.use(xss());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(productRoutes)
app.use(userRoutes)

app.all("*", (req, res) => {
  res.status(404).send("Page introuvable");
});

app.listen(process.env.PORT || 3001, () => {
  console.log("Server has started");
});
