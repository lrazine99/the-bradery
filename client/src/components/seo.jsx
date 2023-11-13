import PropTypes from "prop-types";
import { Helmet, HelmetProvider } from "react-helmet-async";

const SEO = ({ titleTemplate, description }) => {
  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {"The Bradery"} | {titleTemplate}
        </title>
        <meta name="description" content={description} />
      </Helmet>
    </HelmetProvider>
  );
};

SEO.propTypes = {
  titleTemplate: PropTypes.string,
  description: PropTypes.string,
};

SEO.defaultProps = {
  titleTemplate: "Home",
  description: "Page Home de la  plateforme The Bradery",
};

export default SEO;
