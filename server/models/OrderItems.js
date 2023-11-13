const db = require("../config/db");

class OrderItems {
  constructor(orderId, productId, quantity, unitPrice) {
    this.orderId = orderId;
    this.productId = productId;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
  }

  async save() {
    const query =
      "INSERT INTO order_items(order_id, product_id, quantity, unit_price) VALUES(?,?,?,?)";

    const [newOrderItems, _] = await db.execute(query, [
      this.orderId,
      this.productId,
      this.quantity,
      this.unitPrice,
    ]);

    return newOrderItems;
  }
}

module.exports = OrderItems;
