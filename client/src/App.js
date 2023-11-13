import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserContext } from "./hooks/userContext";
import { cartWhislistContext } from "./hooks/cartWhislistContext";
import Cookies from "js-cookie";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Cart = lazy(() => import("./pages/Cart"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Product = lazy(() => import("./pages/Product"));
const Shop = lazy(() => import("./pages/Shop"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const LoginRegister = lazy(() => import("./pages/LoginRegister"));
const Checkout = lazy(() => import("./pages/Checkout"));

const App = () => {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [products, setProducts] = useState([]);
  const [cartWishlist, setCartWishlist] = useState({
    cart: Cookies.get("cart") ? JSON.parse(Cookies.get("cart")) : [],
    wishlist: Cookies.get("wishlist")
      ? JSON.parse(Cookies.get("wishlist"))
      : [],
  });

  const handleToken = (token) => {
    if (token) {
      Cookies.set("token", token, { expires: 7, sameSite: "strict" });
    } else {
      Cookies.remove("user-id");
      Cookies.remove("token");
    }

    setToken(token);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const {
          data: { message },
        } = await axios.get(`${process.env.REACT_APP_BACK_ENDPOINT}/products`);

        setProducts(
          message.map((product) => {
            const copy = { ...product, price: Number(product.price) };

            return copy;
          })
        );
      } catch (error) {
        toast("erreur lors du chargement", {
          position: "bottom-left",
        });
      }
    };
    if (!products.length) {
      fetchProducts();
    }
  });

  return (
    <Router>
      <Suspense
        fallback={
          <div className="flone-preloader-wrapper">
            <div className="flone-preloader">
              <span></span>
              <span></span>
            </div>
          </div>
        }
      >
        <UserContext.Provider value={{ token, handleToken }}>
          <cartWhislistContext.Provider
            value={{ cartWishlist, setCartWishlist }}
          >
            <Routes>
              <Route
                path={process.env.PUBLIC_URL + "/"}
                element={<Shop products={products} />}
              />

              <Route
                path={process.env.PUBLIC_URL + "/produit/:id"}
                element={<Product products={products} />}
              />

              <Route
                path={process.env.PUBLIC_URL + "/panier"}
                element={<Cart products={products} />}
              />

              <Route
                path={process.env.PUBLIC_URL + "/wishlist"}
                element={<Wishlist products={products} />}
              />

              <Route
                path={process.env.PUBLIC_URL + "/commande"}
                element={<Checkout products={products} />}
              />

              <Route
                path={process.env.PUBLIC_URL + "/connexion-inscription"}
                element={<LoginRegister products={products} />}
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
            <ToastContainer />
          </cartWhislistContext.Provider>
        </UserContext.Provider>
      </Suspense>
    </Router>
  );
};

export default App;
