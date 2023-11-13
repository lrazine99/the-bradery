import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Logo from "../../components/header/Logo";
import NavMenu from "../../components/header/NavMenu";
import IconGroup from "../../components/header/IconGroup";
import MobileMenu from "../../components/header/MobileMenu";

const Header = ({
  layout,
  headerPaddingClass,
  headerPositionClass,
  headerBgClass,
}) => {
  const [scroll, setScroll] = useState(0);
  const [headerTop, setHeaderTop] = useState(0);

  useEffect(() => {
    const header = document.querySelector(".sticky-bar");
    setHeaderTop(header.offsetTop);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  return (
    <header
      className={clsx(
        "header-area clearfix",
        headerBgClass,
        headerPositionClass
      )}
    >
      <div
        className={clsx(
          headerPaddingClass,
          "sticky-bar header-res-padding clearfix",
          scroll > headerTop && "stick"
        )}
      >
        <div className={layout === "container-fluid" ? layout : "container"}>
          <div className="row">
            <div className="col-xl-2 col-lg-2 col-md-6 col-4 d-flex justify-content-center align-items-center">
              <span>The Bradery</span>
            </div>
            <div className="col-xl-8 col-lg-8 d-none d-lg-block">
              <NavMenu />
            </div>
            <div className="col-xl-2 col-lg-2 col-md-6 col-8">
              <IconGroup />
            </div>
          </div>
        </div>
        <MobileMenu />
      </div>
    </header>
  );
};

Header.propTypes = {
  headerPaddingClass: PropTypes.string,
  headerPositionClass: PropTypes.string,
  layout: PropTypes.string,
};

export default Header;
