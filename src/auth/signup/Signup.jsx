import React, { useState } from "react";
import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { signupUser } from '../../redux/authSlice';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('admin'); // Set default role
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onChangeName = (e) => {
        setName(e.target.value);
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const onSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        setLoading(true);
        setError(null);
        //validation
        if (!name || name.length < 3) {
            setError("Name must be at least 3 characters long.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (!password || !passwordRegex.test(password)) {
            setError("Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, and one number.");
            return;
        }

        setLoading(true);
        try {
            const userData = {
                name: name,
                email: email,
                password: password,
                role: role,
            };

            const resultAction = await dispatch(signupUser(userData)).unwrap();
            

            // If signup was successful, redirect to login
            navigate('/login'); // Or any other appropriate route

        } catch (err) {
            // If signup failed, set the error message
            setError(err.message || 'Signup failed');
            console.error('Signup failed:', err);
        } finally {
            setLoading(false);
        }
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
                        value={name}
                        onChange={onChangeName}
                        required
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
                        required
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        autoComplete="off"
                        placeholder="Enter Password"
                        value={password}
                        onChange={onChangePassword}
                        required
                    />
                    <button type="submit" className="btn btn-success" disabled={loading}>
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </div>
            </form>
            {error && <p className="text-danger">{error}</p>}
            <div className="login">
                <p>Already have an Account? </p>
                <Link to="/login" className="btn btn-primary">
                    Login
                </Link>
            </div>
        </div>
    );
};

export default Signup;
