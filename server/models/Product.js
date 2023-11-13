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
  static getOneByCriteria(id) {
    const query = "SELECT * from products WHERE id = ?";
    return db.execute(query, [id]);
  }
}

module.exports = Product;
