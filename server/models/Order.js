const db = require("../config/db");

class Order {
  constructor(customerId, orderDate, totalAmount) {
    this.customerId = customerId;
    this.orderDate = orderDate;
    this.totalAmount = totalAmount;
  }

  save() {
    const query =
      "INSERT INTO orders(customer_id, order_date, total_amount) VALUES(?,?,?);";

    return db.execute(query, [
      this.customerId,
      this.orderDate,
      this.totalAmount,
    ]);
  }
}

module.exports = Order;
