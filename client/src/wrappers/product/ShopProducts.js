import PropTypes from "prop-types";
import clsx from "clsx";
import ProductGridListSingle from "../../components/product/ProductGridListSingle";
import { cartWhislistContext } from "../../hooks/cartWhislistContext";
import { useContext } from "react";

const ShopProducts = ({ products, layout }) => {
  const { cartWishlist, setCartWishlist } = useContext(cartWhislistContext);

  return (
    <div className="shop-bottom-area mt-35">
      <div className={clsx("row", layout)}>
        {products.length ? (
          products?.map((product) => {
            return (
              <div className="col-xl-4 col-sm-6" key={product.id}>
                <ProductGridListSingle
                  spaceBottomClass="mb-25"
                  product={product}
                  cartWishlist={cartWishlist}
                  setCartWishlist={setCartWishlist}
                />
              </div>
            );
          })
        ) : (
          <div>Aucun Produits</div>
        )}
      </div>
    </div>
  );
};

ShopProducts.propTypes = {
  layout: PropTypes.string,
  products: PropTypes.array,
};

export default ShopProducts;
