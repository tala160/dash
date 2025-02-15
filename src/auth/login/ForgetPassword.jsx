import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword } from '../../redux/authSlice';
import { Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; 
import './login.css';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [isPress, setIsPress] = useState(false);
    const [emailError, setEmailError] = useState('');
    const navigate = useNavigate(); 

    const forgetPasswordSuccess = useSelector((state) => state.auth.forgetPasswordSuccess);
    const errorMessage = useSelector((state) => state.auth.error);

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsPress(true);
        setLoading(true);

        if (!email) {
            setEmailError('Email is required');
            setLoading(false);
            setIsPress(false);
            return;
        }

        setEmailError('');
        
        try {
            const resultAction = dispatch(forgetPassword(email));

            // بعد نجاح العملية، قم بإعادة التوجيه إلى صفحة إعادة تعيين كلمة المرور
            if (forgetPassword.fulfilled.match(resultAction)) {
              // افتراض أن ال backend يرجع التوكن مع الرد
              const token = resultAction.payload.token; 
              navigate(`/reset-password/${token}`);
            }
            setEmail('');
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
            setIsPress(false);
        }
    };

    return (
        <div className="addUser">
            <h3>Forget Password</h3>
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
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && (
                        <p style={{ color: 'red' }}>{emailError}</p>
                    )}
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? (
                            'Sending...'
                        ) : (
                            'Send Reset Password Link'
                        )}
                    </button>
                </div>
            </form>

            {isPress && loading && (
                <Spinner animation="border" role="status" />
            )}

            {forgetPasswordSuccess && (
                <p style={{ color: 'green' }}>A password reset link has been sent to your email.</p>
            )}
            {errorMessage && (
                <p style={{ color: 'red' }}>{errorMessage}</p>
            )}

            <div className="login">
                <p>Have an account? </p>
                <Link to="/" className="btn btn-success">
                    Sign In
                </Link>
            </div>
        </div>
    );
};

export default ForgetPassword;
