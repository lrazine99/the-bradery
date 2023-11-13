const Product = require("../models/Product");

exports.getAllProducts = async (req, res) => {
  try {
    const [data, _] = await Product.getAll();

    res.status(200).json({ message: data });
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;
  const numericId = Number(id);

  try {
    if (!isNaN(numericId) && numericId > 0) {
      const [data, _] = await Product.getOneById(numericId);

      res.status(200).json({ message: data });
    } else {
      res.status(400).json({ message: "wrong id" });
    }
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
};
