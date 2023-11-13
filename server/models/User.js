const db = require("../config/db");

class User {
  constructor(username, email, hash, salt, token) {
    this.username = username;
    this.email = email;
    this.hash = hash;
    this.salt = salt;
    this.token = token;
  }

  async save() {
    const query =
      "INSERT INTO users(username, email, hash, salt, token) VALUES(?,?,?,?,?)";

    const [newUser, _] = await db.execute(query, [
      this.username,
      this.email,
      this.hash,
      this.salt,
      this.token,
    ]);

    return newUser;
  }

  /**
   * @param {string} username
   * @returns {Promise}
   */
  static getOneByUserName(username) {
    const query = "SELECT * from users WHERE username = ?";
    return db.execute(query, [username]);
  }

   /**
   * @param {string} email
   * @returns {Promise}
   */
   static getOneByEmail(email) {
    const query = "SELECT * from users WHERE email = ?";
    return db.execute(query, [email]);
  }
}

module.exports = User;
