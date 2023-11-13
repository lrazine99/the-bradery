import PropTypes from "prop-types";
import clsx from "clsx";

const FooterCopyright = ({ spaceBottomClass, colorClass }) => {
  return (
    <div className={clsx("copyright", spaceBottomClass, colorClass)}>
      <p>
        The Bradery &copy; {new Date().getFullYear()}
        <br /> Tous les Droits sont Réservés
      </p>
    </div>
  );
};

FooterCopyright.propTypes = {
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string,
};

export default FooterCopyright;
