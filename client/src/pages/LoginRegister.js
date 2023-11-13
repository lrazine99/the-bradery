import { Fragment, useState, useContext } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SEO from "../components/seo";
import Layout from "../layout/Layout";
import Breadcrumb from "../wrappers/breadcrumb/Breadcrumb";
import axios from "axios";
import Cookies from "js-cookie";
import { UserContext } from "../hooks/userContext";
import DOMPurify from "dompurify";
import { toast } from "react-toastify";

const LoginRegister = () => {
  const rememberUser = Cookies.get("remember-user")
    ? JSON.parse(Cookies.get("remember-user"))
    : false;
  let { pathname } = useLocation();
  const navigate = useNavigate();
  const [isCheckedRemember, setIsCheckedRemember] = useState(rememberUser);
  const [dataLogin, setDataLogin] = useState({
    username: rememberUser ? Cookies.get("username") : "",
    password: null,
    token: rememberUser ? Cookies.get("token-remember") : null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dataRegister, setDataRegister] = useState({
    username: null,
    email: null,
    password: null,
    passwordConfirm: null,
  });
  const { token, handleToken } = useContext(UserContext);

  const handleDataLogin = ({ target }) => {
    setDataLogin((data) => {
      const copy = { ...data };

      copy[target.name] = DOMPurify.sanitize(target.value);

      return copy;
    });
  };

  const handleDataRegister = ({ target }) => {
    setDataRegister((data) => {
      const copy = { ...data };

      copy[target.name] = DOMPurify.sanitize(target.value);

      return copy;
    });
  };

  const handleLoginForm = async (e) => {
    e.preventDefault();

    if (!rememberUser && !dataLogin.username?.length) {
      toast("Veuillez renseigner un username", {
        position: "bottom-left",
      });

      return false;
    }

    if (!rememberUser && !dataLogin.password?.length) {
      toast("Veuillez renseigner un mot de passe", {
        position: "bottom-left",
      });

      return false;
    }

    try {
      const { data } = await axios.post(
        `http://localhost:3001/user/login`,
        dataLogin
      );

      toast("Connexion réussite", {
        position: "bottom-left",
      });

      if (isCheckedRemember) {
        Cookies.set("token-remember", data.token);
      } else {
        Cookies.remove("token-remember", data.token);
      }

      handleToken(data.token);

      Cookies.set("remember-user", isCheckedRemember);
      Cookies.set("user-id", data._id);
      Cookies.set("username", data.username);

      navigate(process.env.PUBLIC_URL + "/");
    } catch ({ response }) {
      toast(response.data.message, {
        position: "bottom-left",
      });
    }
  };

  const handleRegisterForm = async (e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!dataRegister.username?.length) {
      toast("Veuillez renseigner un username", {
        position: "bottom-left",
      });

      return false;
    } else if (
      dataRegister.username?.length < 3 ||
      dataRegister.username?.length > 30
    ) {
      toast(
        "Veuillez renseigner un username entre de 3 à 30 caractères maximum",
        {
          position: "bottom-left",
        }
      );

      return false;
    }

    if (!emailRegex.test(dataRegister.email)) {
      toast("Veuillez renseigner une adress email valide", {
        position: "bottom-left",
      });

      return false;
    }

    if (!dataRegister.password?.length) {
      toast("Veuillez renseigner un mot de passe", {
        position: "bottom-left",
      });

      return false;
    }

    if (!dataRegister.passwordConfirm?.length) {
      toast("Veuillez confirmer votre mot de passe", {
        position: "bottom-left",
      });

      return false;
    }

    if (dataRegister.password !== dataRegister.passwordConfirm) {
      toast("Vos mots de passe ne sont pas identiques", {
        position: "bottom-left",
      });

      return false;
    }

    try {
      setIsSubmitting(true);

      const { data } = await axios.post(
        `http://localhost:3001/user/signup`,
        dataRegister
      );

      toast("Inscription réussite", {
        position: "bottom-left",
      });

      handleToken(data.token);
      Cookies.set("user-id", data._id);
      navigate(process.env.PUBLIC_URL + "/");
    } catch ({ response }) {
      toast(response.data.message, {
        position: "bottom-left",
      });

      setIsSubmitting(false);
    }
  };

  return !token ? (
    <Fragment>
      <SEO
        titleTemplate="LoginRegister"
        description="Page de connexion et d'inscription de la plateforme TheBradery."
      />
      <Layout headerTop="visible">
        <Breadcrumb
          pages={[
            { label: "Shop", path: process.env.PUBLIC_URL + "/" },
            {
              label: "Connexion Inscription",
              path: process.env.PUBLIC_URL + pathname,
            },
          ]}
        />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ms-auto me-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>Connexion</h4>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>Inscription</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={handleLoginForm}>
                              <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                defaultValue={dataLogin.username}
                                onChange={handleDataLogin}
                              />
                              <input
                                type="password"
                                name="password"
                                placeholder="Mot de Passe"
                                onChange={handleDataLogin}
                              />
                              <div className="button-box">
                                <div className="login-toggle-btn">
                                  <input
                                    type="checkbox"
                                    checked={isCheckedRemember}
                                    onChange={() => {
                                      setIsCheckedRemember(!isCheckedRemember);
                                    }}
                                  />
                                  <label className="ml-10">
                                    Se souvenir de moi
                                  </label>
                                </div>
                                <button type="submit">
                                  <span>Connexion</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={handleRegisterForm}>
                              <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                onChange={handleDataRegister}
                              />
                              <input
                                type="password"
                                name="password"
                                placeholder="Mot de Passe"
                                onChange={handleDataRegister}
                              />
                              <input
                                type="password"
                                name="passwordConfirm"
                                placeholder="Confirmer Mot de Passe"
                                onChange={handleDataRegister}
                              />
                              <input
                                name="email"
                                placeholder="Email"
                                type="email"
                                onChange={handleDataRegister}
                              />
                              <div className="button-box">
                                <button type="submit" disabled={isSubmitting}>
                                  <span>Inscription</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </Fragment>
  ) : (
    <Navigate to={`${process.env.PUBLIC_URL}/`} />
  );
};

export default LoginRegister;
