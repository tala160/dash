import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword } from '../../redux/authSlice';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './login.css'; // تأكد من استيراد الأنماط

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isPress, setIsPress] = useState(false);

  const forgetPasswordSuccess = useSelector((state) => state.auth.forgetPasswordSuccess);
  const errorMessage = useSelector((state) => state.auth.error);

  const onSubmit = async (e) => {
    e.preventDefault(); // منع إعادة تحميل الصفحة
    setIsPress(true);
    setLoading(true);
    await dispatch(forgetPassword(email));
    setLoading(false);
    setIsPress(false);
    setEmail(''); // مسح حقل الإدخال بعد الإرسال
  };

  return (
    <div className="addUser">
      <h3>نسيان كلمة المرور</h3>
      <form className="addUserForm" onSubmit={onSubmit}>
        <div className="inputGroup">
          <label htmlFor="email">البريد الإلكتروني:</label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="off"
            placeholder="أدخل بريدك الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // تحديث حالة البريد الإلكتروني
          />
          <button type="submit" className="btn btn-primary">
            إرسال رابط إعادة تعيين كلمة المرور
          </button>
        </div>
      </form>

      {isPress && loading && (
        <Spinner animation="border" role="status" />
      )}

      {forgetPasswordSuccess && (
        <p style={{ color: 'green' }}>تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني.</p>
      )}
      {errorMessage && (
        <p style={{ color: 'red' }}>{errorMessage}</p>
      )}

      <div className="login">
        <p>هل لديك حساب؟ </p>
        <Link to="/" className="btn btn-success">
          تسجيل الدخول
        </Link>
      </div>
    </div>
  );
};

export default ForgetPassword;
