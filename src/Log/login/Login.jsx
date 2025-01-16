import React, { useState , useEffect } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import {  Spinner } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';
// import notify from '../../Home/Hook/useNotifaction';
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [isPress, setIsPress] = useState(false);
  const navigate = useNavigate(); // Hook for navigation
  // const dispatch = useDispatch();

  const onChangeEmail = (e) => {
    setEmail(e.target.value)}

  const onChangePassword = (e) => {
    setPassword(e.target.value)}


    const onSubmit = async () => {
      setIsPress(true)
      setLoading(true)
      // await dispatch(loginUser({
      //     email,
      //     password
      // }))

      setLoading(false)
      setIsPress(false)
  }

  // const res = useSelector(state => state.authReducer.loginUser)
  // useEffect(() => {
  //     if (loading === false) {
  //         if (res) {
  //             console.log(res)
  //             if (res.data.token) {
  //                 localStorage.setItem("token", res.data.token)
  //                 localStorage.setItem("user", JSON.stringify(res.data.data))
  //                 notify("تم تسجيل الدخول بنجاح", "success")
  //                 setTimeout(() => {
  //                     window.location.href = "/"
  //                 }, 1500);
  //             } else {
  //                 localStorage.removeItem("token")
  //                 localStorage.removeItem("user")
  //             }

  //             if (res.data.message === "Incorrect email or password") {
  //                 localStorage.removeItem("token")
  //                 localStorage.removeItem("user")
  //                 notify("كلمة السر او الايميل خطا", "error")
  //             }
  //             setLoading(true)
  //         }
  //     }
  // }, [loading])

    // Check if credentials are correct
    if (email === "test@gmail.com" && password === "test") {
      navigate("../../home"); // Redirect to homepage
    } else {
      navigate("../../home");// Show an alert for invalid credentials
    }
 

  return (
    <div className="addUser ">
      <h3>Sign in</h3>
      <form className="addUserForm" onSubmit={onSubmit}>
        <div className="inputGroup">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="off"
            placeholder="Enter your Email"
            value={email}
            onChange={onChangeEmail} // Update email state
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="off"
            placeholder="Enter your Password"
            value={password}
            onChange={onChangePassword} // Update password state
          />
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </form>
      <label className="mx-auto my-4">

      <Link to="/forgetPassword" style={{ textDecoration: 'none', color: 'red' }}>
          هل نسيت كلمه السر
       </Link>
      </label>

      {isPress === true ? (loading === true ? (<Spinner animation="border" role="status">
      </Spinner>) : null) : null}


      <div className="login">
        <p>Don't have an Account? </p>
        <Link to="/" className="btn btn-success">
          Sign Up
        </Link>
      </div>
  
    </div>
  );
};

export default Login;
