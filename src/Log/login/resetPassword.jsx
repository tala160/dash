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
    e.preventDefault(); // منع إعادة تحميل الصفحة
    setIsPress(true);
    setLoading(true);
    await dispatch(resetPassword({ token, newPassword }));
    setLoading(false);
    setIsPress(false);
    setNewPassword(''); // مسح حقل الإدخال بعد الإرسال
  };

  return (
    <div className="addUser">
      <h3>إعادة تعيين كلمة المرور</h3>
      <form className="addUserForm" onSubmit={onSubmit}>
        <div className="inputGroup">
          <label htmlFor="new-password">كلمة المرور الجديدة:</label>
          <input
            type="password"
            id="new-password"
            name="new-password"
            autoComplete="off"
            placeholder="أدخل كلمة المرور الجديدة"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)} // تحديث حالة كلمة المرور الجديدة
          />
          <button type="submit" className="btn btn-primary">
            إعادة تعيين
          </button>
        </div>
      </form>

      {isPress && loading && (
        <Spinner animation="border" role="status" />
      )}

      {resetPasswordSuccess && (
        <p style={{ color: 'green' }}>تم تغيير كلمة المرور بنجاح.</p>
      )}
      {errorMessage && (
        <p style={{ color: 'red' }}>{errorMessage}</p>
      )}
    </div>
  );
};

export default ResetPassword;
