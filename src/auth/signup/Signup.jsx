import React , { useState }from "react";
import "./signup.css";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { signupUser } from '../../redux/authSlice';
const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const onChangeName = (e) => {
    setUsername(e.target.value)}

  const onChangeEmail = (e) => {
    setEmail(e.target.value)}

  const onChangePassword = (e) => {
    setPassword(e.target.value)}

  const onSubmit = () => {
    dispatch(signupUser({ username, email, password }));
  };

  return (
    <div className="addUser">
      <h3>Sign Up</h3>
      <form className="addUserForm" onSubmit={onSubmit}>
        <div className="inputGroup">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            autoComplete="off"
            placeholder="Enter your name"
            value={username}
            onChange={onChangeName}
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="off"
            placeholder="Enter your Email"
            value={email}
            onChange={onChangeEmail}
          />
          <label htmlFor="Password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="off"
            placeholder="Enter Password"
            value={password}
            onChange={onChangePassword}
          />
          <button type="submit" class="btn btn-success">
            Sign Up
          </button>
        </div>
      </form>
      <div className="login">
        <p>Already have an Account? </p>
        <Link to="/login" type="submit" class="btn btn-primary">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;
