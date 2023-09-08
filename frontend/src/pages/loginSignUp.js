import Nav from "../components/nav";
import Footer from "../components/footer";
import "../components/App.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAC, signupAC } from "../actions";
import { useDispatch, useSelector } from "react-redux";
const LoginSignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.cart.items);
  const usr = useSelector((state) => state.user);
  const blank_user = { name: "", email: "", password: "" };
  const [user, setUser] = useState(blank_user);
  const [login, setLogin] = useState(true);
  const userLogin = (user) => {
    dispatch(loginAC(user, navigate));
  };

  const userSignup = (user) => {
    dispatch(signupAC(user, navigate));
  };

  const validateLogin = (user, navigate) => {
    if (!user.email || !user.password) {
      alert("Please enter your details!");
    } else {
      userLogin(user);
    }
  };

  const validateSignup = (user, navigate) => {
    if (!user.email || !user.password || !user.name) {
      alert("Please enter your details");
    } else {
      userSignup(user);
    }
  };

  return (
    <>
      <Nav cartCount={items.length} user={usr}></Nav>
      <div className="container-fluid top-page">
        <div className="d-flex justify-content-between">
          <h5 className="fw-bold">Create Account or Login</h5>
          <h6 className="text-muted">Home &gt; Login </h6>
        </div>
      </div>
      <div className="container">
        <div className="login row justify-content-center my-5">
          {
            <>
              {login ? (
                <div className="col-md-3">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      validateLogin(user);
                    }}
                  >
                    <h5 className="login-t">Login</h5>
                    <label htmlFor="email">
                      Email<i class="fa-solid fa-check"></i>
                    </label>
                    <br />
                    <input
                      type="email"
                      name="email"
                      className="form-input-login"
                      value={user.email}
                      onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                      }
                    />
                    <br />
                    <label htmlFor="password">
                      Password<i class="fa-solid fa-check"></i>
                    </label>
                    <br />
                    <input
                      type="password"
                      name="password"
                      className="form-input-login"
                      value={user.password}
                      onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                      }
                    />
                    <br />
                    <button type="submit" className="login-btn">
                      Login
                    </button>
                    <br />
                    <p className="login-span">Don't have an account?</p>
                    <p className="create-ac" onClick={() => setLogin(false)}>
                      Create One Now
                    </p>
                  </form>
                </div>
              ) : (
                <div className="col-md-3">
                  <h5 className="login-t">Sign Up</h5>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      validateSignup(user);
                    }}
                  >
                    <label htmlFor="name">
                      Name<i class="fa-solid fa-check"></i>
                    </label>
                    <br />
                    <input
                      type="text"
                      name="name"
                      className="form-input-login"
                      value={user.name}
                      onChange={(e) =>
                        setUser({ ...user, name: e.target.value })
                      }
                    />{" "}
                    <br />
                    <label htmlFor="email">
                      Email<i class="fa-solid fa-check"></i>
                    </label>
                    <br />
                    <input
                      type="email"
                      name="email"
                      className="form-input-login"
                      value={user.email}
                      onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                      }
                    />
                    <br />
                    <label htmlFor="password">
                      Password<i class="fa-solid fa-check"></i>
                    </label>
                    <br />
                    <input
                      type="password"
                      name="password"
                      className="form-input-login"
                      value={user.password}
                      onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                      }
                    />
                    <br />
                    <button type="submit" className="login-btn">
                      Sign Up
                    </button>
                    <p className="login-span">Already have an account?</p>
                    <p className="create-ac" onClick={() => setLogin(true)}>
                      Login Now
                    </p>
                  </form>
                </div>
              )}
            </>
          }
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};
export default LoginSignUp;
