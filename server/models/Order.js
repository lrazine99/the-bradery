const db = require("../config/db");

class Order {
  constructor(customerId, totalAmount) {
    this.customerId = customerId;
    this.totalAmount = totalAmount;
  }

  save() {
    const query =
      "INSERT INTO orders(customer_id, total_amount) VALUES(?,?);";

    return db.execute(query, [
      this.customerId,
      this.totalAmount,
    ]);
  }
}

module.exports = Order;
