import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import "./login.scss";
import logo from "../../img/logo.png";
import loginSideImg from "../../img/loginSideImg.png";
import {useEffect, } from "react";
import useLocalStorage from "../../utils/useLocalStorage";

export default function Login() {
  const [passwordType, setPasswordType] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const [users, setUsers] = useState([]);
  const { getItem } = useLocalStorage("users");

  useEffect(() => {
    setUsers(getItem());
  }, []);


  const { dispatch } = useContext(AuthContext);

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else setPasswordType("password");
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch({ type: "LOGIN_START" })
    try {
      // const res = users.filter(user=> user.first_name !== 'Adedeji')
      dispatch({ type: "LOGIN_SUCCESS", payload: [] })
      navigate('/home')
    } catch (err) {
      console.log(err);
      dispatch({ type: "LOGIN_FAILURE", payload: err.response?.data })
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginTop">
          <img className='logo' src={logo} alt="logo" />
        </div>
        <div className="loginBottom">
          <div className="loginSideImg">
            <img className="loginImg" src={loginSideImg} alt="loginSideImg" />
          </div>
          <div className="loginFormContainer">
            <div className="loginForm">
              <span className="loginTitle">Welcome!</span>
              <span className="loginDesc">Enter details to login.</span>

              <form onSubmit={handleSubmit} className='loginform2'>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className='inputEmail'
                  required={true}
                  autoFocus={true}
                />

                <div className="formPass">
                  <input
                    type={passwordType}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className='inputPass'
                    required={true}
                    minLength={6}
                  />

                  <span className="showPass" onClick={togglePassword}>
                    {passwordType === "password" ? "SHOW" : "HIDE"}
                  </span>
                </div>
                <span className="forgetPass">FORGET PASSWORD?</span>
                <button type='submit' className="loginbtn">LOG IN</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
