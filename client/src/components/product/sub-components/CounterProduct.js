import { changeQuantity } from "../../../helpers/cartWishlist";

const CounterProduct = ({
  product,
  quantityCount,
  cartQuantity,
  setQuantityCount,
  singleCount,
  setCartWishlist,
}) => {
  return (
    <div className="cart-plus-minus">
      <button
        onClick={() =>
          setQuantityCount((quantityCount) => {
            const copy = { ...quantityCount };

            copy[product.id] = copy[product.id] > 1 ? copy[product.id] - 1 : 1;

            if (!singleCount) {
              changeQuantity(product, copy[product.id], setCartWishlist);
            }

            return copy;
          })
        }
        className="dec qtybutton"
      >
        -
      </button>
      <input
        className="cart-plus-minus-box"
        type="text"
        value={quantityCount[product.id]}
        readOnly
      />
      <button
        onClick={() =>
          setQuantityCount((quantityCount) => {
            const copy = { ...quantityCount };

            if (singleCount) {
              copy[product.id] +=
                copy[product.id] < product.inventory - cartQuantity ? 1 : 0;
            } else {
              copy[product.id] += copy[product.id] < product.inventory ? 1 : 0;

              changeQuantity(product, copy[product.id], setCartWishlist);
            }

            return copy;
          })
        }
        className="inc qtybutton"
      >
        +
      </button>
    </div>
  );
};

export default CounterProduct;
