import { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/authSlice";
import {
    showSuccessNotification,
    showErrorNotification
} from '../../services/NotificationService';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); // Start with loading false
    const [error, setError] = useState(null); // For displaying errors
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const onSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        setLoading(true); // Start loading
        setError(null); // Clear previous errors

        try {
            const resultAction = await dispatch(loginUser({ email, password })).unwrap();
            // If login was successful, redirect to home
            showSuccessNotification("Login successful! Welcome back.");
            navigate('/home');
        } catch (err) {
            // If login failed, set the error message
            setError(err.message || 'Login failed');
            showErrorNotification(err.message || 'Login failed');
        } finally {
            setLoading(false); // Stop loading, regardless of success or failure
        }
    };

    // Check if both fields are filled
    const isFormValid = email.trim() !== "" && password.trim() !== "";

    return (
        <div className="addUser ">
             <Toaster />
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
                    <button type="submit" className="btn btn-s" disabled={loading || !isFormValid}>
                        {loading ? 'Logging In...' : 'Login'}
                    </button>
                </div>
            </form>

            {error && <p className="text-danger">{error}</p>}  {/* Display error message */}

            <label className="mx-auto my-4 forgot-password">
                <Link to="/forget-password" style={{ textDecoration: "none", color: "red" }}>
                    Forgot Password?
                </Link>
            </label>

            <div className="login">
                <p>Don&apos;t have an Account? </p>
                <Link to="/" className="btn " style={{ backgroundColor: "black", color:"#fff" }}>
                    Sign Up
                </Link>
            </div>
        </div>
    );
};

export default Login;
