const User = require("../models/User");
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const base64 = require("crypto-js/enc-base64");

exports.userSignup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (username && email && password) {
      const [userFoundByUsername] = await User.getOneByUserName(username);
      const [userFoundByEmail] = await User.getOneByEmail(email);

      if (!userFoundByUsername.length && !userFoundByEmail.length) {
        const generatedToken = uid2(16);
        const generatedSalt = uid2(12);
        const generatedHash = SHA256(password + generatedSalt).toString(base64);

        const newUser = new User(
          username,
          email,
          generatedHash,
          generatedSalt,
          generatedToken
        );

        newUser.save();

        res.status(201).json({
          token: newUser.token,
        });
      } else {
        if (userFoundByUsername.length) {
          res.status(409).json({ message: "Ce username est déja pris" });
        } else {
          res.status(409).json({ message: "Cet email est déja pris" });
        }
      }
    } else {
      res.status(400).json({ message: "Données manquante" });
    }
  } catch (error) {
    res.status(400).json({ message: "Erreur veuillez réessayer" });
  }
};

exports.userLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    let [[userFound]] = await User.getOneByUserName(username);

    if (userFound) {
      const generatedHash = SHA256(password + userFound.salt).toString(base64);

      if (
        generatedHash === userFound.hash ||
        req.body?.token === userFound.token
      ) {
        res.status(200).json({
          id: userFound.id,
          username: userFound.username,
          token: userFound.token,
        });
      } else {
        res
          .status(401)
          .json({ message: "email et/ou mot de passe incorrect(s)" });
      }
    } else {
      res
        .status(401)
        .json({ message: "email et/ou mot de passe incorrect(s)" });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "error lors de la connexion veuillez réessayer" });
  }
};
