import React, { Fragment } from "react";
import { useParams, useLocation, Navigate } from "react-router-dom";
import SEO from "../components/seo";
import Layout from "../layout/Layout";
import Breadcrumb from "../wrappers/breadcrumb/Breadcrumb";
import ProductImageDescription from "../wrappers/product/ProductImageDescription";

const Product = ({ products }) => {
  let { pathname } = useLocation();
  let { id } = useParams();

  const product = products.find((product) => product.id === Number(id));

 
  return (
    <Fragment>
      <SEO
        titleTemplate="Produit"
        description="Page Produit qui affiche un jeux en detail sur la plateforme GameCenter."
      />

      <Layout headerTop="visible">
        <Breadcrumb
          pages={[{ label: "Shop", path: process.env.PUBLIC_URL + pathname }]}
        />
        {product ? (
            <ProductImageDescription
              spaceTopClass="pt-100"
              spaceBottomClass="pb-100"
              product={product}
            />
        ) : (
            <Navigate to="*" />
        )}
      </Layout>
    </Fragment>
  );
};

export default Product;
