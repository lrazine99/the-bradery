import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import { cartWhislistContext } from "../../hooks/cartWhislistContext";
import { addItem, findItem } from "../../helpers/cartWishlist";
import CounterProduct from "./sub-components/CounterProduct";

const ProductDescriptionInfo = ({ product, finalProductPrice }) => {
  const { cartWishlist, setCartWishlist } = useContext(cartWhislistContext);
  const [quantityCount, setQuantityCount] = useState({ [product.id]: 0 });
  const cartItem = findItem(product, "cart", cartWishlist);
  const cartQuantity = cartItem?.quantity ?? 0;
  const isValidCartItem = cartItem && cartItem?.quantity === product.inventory;
  const wishlistItem = findItem(product, "wishlist", cartWishlist);

  return (
    <div className="product-details-content ml-70">
      <h2>{product.name}</h2>
      <div className="product-details-price">
        <span>{`${finalProductPrice} €`}</span>
      </div>

      <div className="pro-details-quality">
        <CounterProduct
          product={product}
          cartQuantity={cartQuantity}
          quantityCount={quantityCount}
          setQuantityCount={setQuantityCount}
          singleCount={true}
          setCartWishlist={setCartWishlist}
        ></CounterProduct>
        <div className="pro-details-cart btn-hover">
          {!isValidCartItem ? (
            <button
              onClick={() => {
                const outOfStock =
                  quantityCount[product.id] >
                    product.inventory -
                      findItem(product, "cart", cartWishlist)?.quantity ?? 0;

                !outOfStock &&
                  addItem(
                    product,
                    "cart",
                    setCartWishlist,
                    quantityCount[product.id]
                  );
                if (outOfStock) {
                  setQuantityCount(() => ({ [product.id]: 0 }));
                }
              }}
              className=""
              title="Ajouter au panier"
            >
              <i className="pe-7s-cart"></i>
              Ajouter au panier
            </button>
          ) : (
            <button disabled className="active">
              En rupture de stock
            </button>
          )}
        </div>
        <div className="pro-details-wishlist">
          <button
            className={wishlistItem ? "active" : ""}
            disabled={wishlistItem}
            title={
              wishlistItem
                ? "Dans la liste de souhait"
                : "Ajouter à la liste de souhait"
            }
            onClick={() => addItem(product, "wishlist", setCartWishlist)}
          >
            <i className="pe-7s-like" />
          </button>
        </div>
      </div>
    </div>
  );
};

ProductDescriptionInfo.propTypes = {
  finalProductPrice: PropTypes.number,
  product: PropTypes.shape({}),
};

export default ProductDescriptionInfo;
