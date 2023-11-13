import PropTypes from "prop-types";
import clsx from "clsx";
import ProductDescriptionInfo from "../../components/product/ProductDescriptionInfo";

const ProductImageDescription = ({
  spaceTopClass,
  spaceBottomClass,
  product,
}) => {
  return (
    <div className={clsx("shop-area", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <div className="single-image">
              <img
                src={
                  process.env.PUBLIC_URL +
                  `https://picsum.photos/id/${product.id + 10}/200/200`
                }
                className="img-fluid"
                alt=""
              />
            </div>{" "}
          </div>
          <div className="col-lg-6 col-md-6">
            <ProductDescriptionInfo
              product={product}
              finalProductPrice={product.price}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

ProductImageDescription.propTypes = {
  product: PropTypes.shape({}),
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default ProductImageDescription;
