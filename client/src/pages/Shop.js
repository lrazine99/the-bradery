import { Fragment, useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import SEO from "../components/seo";
import Layout from "../layout/Layout";
import Breadcrumb from "../wrappers/breadcrumb/Breadcrumb";
import ShopTopbar from "../wrappers/product/ShopTopbar";
import ShopProducts from "../wrappers/product/ShopProducts";
import { Filter } from "../helpers/product";

const filteredProducts = new Filter();

const Shop = ({ products }) => {
  const { pathname, state } = useLocation();
  const [layout, setLayout] = useState("grid three-column");
  const [sortType, setSortType] = useState(state?.type || "");
  const [sortValue, setSortValue] = useState(state?.value || "");
  const [sortedProducts, setSortedProducts] = useState([]);

  const getLayout = (layout) => {
    setLayout(layout);
  };

  const getSortParams = (sortType, sortValue) => {
    setSortType(sortType);
    setSortValue(sortValue);
  };

  filteredProducts.setProducts(products);

  useEffect(() => {
    filteredProducts.setFilterValue(sortType, sortValue);

    const filterSortedProducts = filteredProducts.getSortedProducts();

    setSortedProducts(filterSortedProducts);
  }, [sortType, sortValue]);

  return (
    <Fragment>
      <SEO
        titleTemplate="Shop"
        description="Page Shop qui contient tous les produits en vente sur la plateforme The Bradery."
      />

      <Layout headerTop="visible">
        <Breadcrumb
          pages={[{ label: "Shop", path: process.env.PUBLIC_URL + pathname }]}
        />

        <div className="shop-area pt-95 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <ShopTopbar
                  getLayout={getLayout}
                  getFilterSortParams={getSortParams}
                  filteredProducts={filteredProducts}
                  productCount={products.length}
                  sortedProductCount={sortedProducts.length}
                />
                <ShopProducts layout={layout} products={sortedProducts} />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};

Shop.propTypes = {
  products: PropTypes.array,
};

export default Shop;
