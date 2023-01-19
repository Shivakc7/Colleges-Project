import "./register.css";
import { useRef } from "react";
import axios from "axios"
import {Link, useNavigate} from 'react-router-dom'

function Register() {
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault()
    if(passwordAgain.current.value !== password.current.value){
      passwordAgain.current.setCustomValidity("password does not match!")
    }else{
      const user = {
        username: name.current.value,
        email: email.current.value,
        password: password.current.value,
      }
      try {
          await axios.post("api/auth/register", user)
          history('/login')
      } catch (error) {
        console.log(error)
      }
    }
  };
  return (
    <div className="register">
      <div className="register-wrapper">
        <div className="register-left">
          <h3 className="register-logo">SocialMedia</h3>
          <span className="register-desc">
            Connect with friends and the world around you on Socialmedia
          </span>
        </div>
        <div className="register-right">
          <form className="register-box" onSubmit={handleSubmit}>
            <input
              required
              placeholder="Username"
              className="register-input"
              ref={name}
              type="text"
            />
            <input
              type="email"
              placeholder="Email"
              className="register-input"
              ref={email}
            />
            <input
              required
              placeholder="Password"
              className="register-input"
              ref={password}
              type="password"
            />
            <input
              required
              placeholder="Confirm Password"
              className="register-input"
              ref={passwordAgain}
              type="password"
            />
            <button type="submit" className="register-btn">
              Sign Up
            </button>
            <Link to="/login">

            <button className="register-register">Log into Account</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
