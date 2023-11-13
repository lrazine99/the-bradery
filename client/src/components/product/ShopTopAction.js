import PropTypes from "prop-types";
import { setActiveLayout } from "../../helpers/product";

const ShopTopAction = ({
  getLayout,
  getFilterSortParams,
  productCount,
  sortedProductCount,
}) => {
  return (
    <div className="shop-top-bar mb-35">
    <div className="sidebar-widget">
      <div className="pro-sidebar-search ">
        <form
          className="pro-sidebar-search-form m-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            id="searchProduct"
            placeholder="Chercher"
            onChange={(e) => getFilterSortParams("search", e.target.value)}
          />
        </form>
      </div>
    </div>
      <div className="select-shoing-wrap">
        <div className="shop-select">
          <select
            onChange={(e) => getFilterSortParams("filterSort", e.target.value)}
          >
            <option value="default">Default</option>
            <option value="priceHighToLow">Prix décroissants</option>
            <option value="priceLowToHigh">Prix croissants</option>
          </select>
        </div>
        <p>
          Affichage {sortedProductCount} de {productCount} Résultats
        </p>
      </div>

      <div className="shop-tab">
        <button
          onClick={(e) => {
            getLayout("grid two-column");
            setActiveLayout(e);
          }}
        >
          <i className="fa fa-th-large" />
        </button>
        <button
          onClick={(e) => {
            getLayout("grid three-column");
            setActiveLayout(e);
          }}
        >
          <i className="fa fa-th" />
        </button>
        <button
          onClick={(e) => {
            getLayout("list");
            setActiveLayout(e);
          }}
        >
          <i className="fa fa-list-ul" />
        </button>
      </div>
    </div>
  );
};

ShopTopAction.propTypes = {
  getFilterSortParams: PropTypes.func,
  getLayout: PropTypes.func,
  productCount: PropTypes.number,
  sortedProductCount: PropTypes.number,
};

export default ShopTopAction;
