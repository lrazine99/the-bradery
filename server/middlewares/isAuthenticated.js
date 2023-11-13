const User = require("../models/User");

const isAuthenticated = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.replace("Bearer ", "");
      const [[userFound]] = await User.getOneByToken(token);

      if (userFound) {
        req.user = userFound;

        return next();
      } else {
        res.status(401).json({ message: "Non autorisé" });
      }
    } else {
      res.status(401).json({ message: "Pas de token envoyé" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = isAuthenticated;
