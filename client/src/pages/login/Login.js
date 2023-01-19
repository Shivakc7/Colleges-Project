import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@mui/material";

function Login() {
  const email = useRef();
  const password = useRef();
  const {  isFetching, dispatch } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <div className="login">
      <div className="login-wrapper">
        <div className="login-left">
          <h3 className="login-logo">SocialMedia</h3>
          <span className="login-desc">
            Connect with friends and the world around you on Socialmedia
          </span>
        </div>
        <div className="login-right">
          <form className="login-box" onSubmit={handleSubmit}>
            <input
              required
              placeholder="Email"
              type="email"
              className="login-input"
              ref={email}
            />
            <input
              required
              minLength="8"
              placeholder="Password"
              type="password"
              className="login-input"
              ref={password}
            />
            <button type="submit" className="login-btn" disabled={isFetching}>
              {isFetching ? <CircularProgress color="secondary" /> : "Log In"}
            </button>
            <span className="login-forgot">Forgot Password</span>
            <button className="login-register">Create a New Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
