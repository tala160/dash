import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../redux/authSlice';
import { Spinner } from 'react-bootstrap';
import './login.css';

const ResetPassword = ({ token }) => {
    const [newPassword, setNewPassword] = useState('');
    const dispatch = useDispatch();

    const resetPasswordSuccess = useSelector((state) => state.auth.resetPasswordSuccess);
    const errorMessage = useSelector((state) => state.auth.error);
    const [loading, setLoading] = useState(false);
    const [isPress, setIsPress] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsPress(true);
        setLoading(true);
        await dispatch(resetPassword({ token, newPassword }));
        setLoading(false);
        setIsPress(false);
        setNewPassword('');
    };

    return (
        <div className="addUser">
            <h3>Reset Password</h3>
            <form className="addUserForm" onSubmit={onSubmit}>
                <div className="inputGroup">
                    <label htmlFor="new-password">New Password:</label>
                    <input
                        type="password"
                        id="new-password"
                        name="new-password"
                        autoComplete="off"
                        placeholder="Enter New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary">
                        Reset
                    </button>
                </div>
            </form>

            {isPress && loading && (
                <Spinner animation="border" role="status" />
            )}

            {resetPasswordSuccess && (
                <p style={{ color: 'green' }}>Password has been reset successfully.</p>
            )}
            {errorMessage && (
                <p style={{ color: 'red' }}>{errorMessage}</p>
            )}
        </div>
    );
};

export default ResetPassword;
