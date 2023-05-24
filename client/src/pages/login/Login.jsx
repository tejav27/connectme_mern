import { useContext, useRef, useState } from "react";
import "./login.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);
  const [isLoginError, setIsLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loginCall = async (userCredential, dispatch) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", userCredential);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err });
      // setIsLoginError(true);
      // setErrorMessage(err);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">ConnectMe</h3>
          <span className="loginDesc">Embrace the Power of Connections</span>
          <form className="loginBox" onSubmit={handleLogin}>
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress style={{ color: "white", size: "10px" }} />
              ) : (
                "Log In"
              )}
            </button>
          </form>
          <br />
          <span>Don't have an account?</span>
          <br />
          {isLoginError && {errorMessage}}
          <Link to={`/register`}>
            <button className="loginRegisterButton">
              {isFetching ? (
                <CircularProgress style={{ color: "white", size: "10px" }} />
              ) : (
                "Create a New Account"
              )}
            </button>
          </Link>
        </div>
        <div className="loginRight">
          <img className="sideImage" src="assets/connections.webp" alt="" />
        </div>
      </div>
    </div>
  );
}
