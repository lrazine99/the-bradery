import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import SEO from "../components/seo";
import Layout from "../layout/Layout";
import Breadcrumb from "../wrappers/breadcrumb/Breadcrumb";

const NotFound = () => {
  let { pathname } = useLocation();

  return (
    <Fragment>
      <SEO
        titleTemplate="Not Found"
        description="404 of flone react minimalist eCommerce template."
      />
      <Layout headerTop="visible">
        <Breadcrumb
          pages={[
            { label: "Shop", path: process.env.PUBLIC_URL + "/" },
            { label: "404 page", path: process.env.PUBLIC_URL + pathname },
          ]}
        />
        <div className="error-area pt-40 pb-100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-7 col-lg-8 text-center">
                <div className="error">
                  <h1>404</h1>
                  <h2>OPPS! PAGE INTROUVABLE</h2>
                  <p>
                    Désolé mais la page que vous recherchez n'existe pas, ayez a
                    été supprimé, le nom a été modifié ou est temporairement
                    indisponible.
                  </p>

                  <Link to={process.env.PUBLIC_URL + "/"} className="error-btn">
                    Retour à la page shop
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};

export default NotFound;
