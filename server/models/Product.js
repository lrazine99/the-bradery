const db = require("../config/db");

class Product {
  /**
   * @returns {Promise}
   */
  static getAll() {
    return db.execute(`SELECT * from products`);
  }

  /**
   * @param {int} id
   * @returns {Promise}
   */
  static getOneById(id) {
    const query = "SELECT * from products WHERE id = ?";
    return db.execute(query, [id]);
  }

  /**
   * @param {int} quantity
   * @param {int} id
   * @returns {Promise}
   */
  static updateQuantityById(quantity, id) {
    const query = "UPDATE products SET inventory = ? WHERE id = ?";
    return db.execute(query, [quantity, id]);
  }
}

module.exports = Product;
