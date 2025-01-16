import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify';
import notify from '../../Hook/useNotifaction';
// import { createNewUser, forgetPassword, loginUser } from '../../redux/action/AuthAction';
import { useNavigate } from 'react-router-dom';

const ForgetPasswordPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(true)


    const OnChangeEmail = (e) => {
        
        setEmail(e.target.value)
    }

    const onSubmit = async () => {
        if (email === "") {
            notify("من فضلك ادخل الايميل", "error")
            return
        }
        localStorage.setItem("user-email" ,email)
        setLoading(true)
        await dispatch(forgetPassword({
            email,
        }))
        setLoading(false)
    }

    // const res = useSelector(state => state.authReducer.forgetPassword)

    // useEffect(() => {
    //     if (loading === false) {
    //         if (res) {
    //             console.log(res)
    //             if (res.data.status === "Success") {
    //                 notify("تم ارسال الكود للايميل بنجاح", "success")
    //                 setTimeout(() => {
    //                     navigate("/user/verify-code")
    //                 }, 1000);
    //             }
    //             if (res.data.status === "fail") {
    //                 notify("هذا الحساب غير موجود لدينا", "error")
    //             }
    //         }
    //     }
    // }, [loading])


    return (
        <Container style={{ minHeight: "690px" }}>
            <Row className="py-5 d-flex justify-content-center ">
                <Col sm="12" className="d-flex flex-column ">
                    <label className="mx-auto title-login">نسيت كلمة السر</label>
                    <input
                        value={email}
                        onChange={OnChangeEmail}
                        placeholder="ادخل الايميل..."
                        type="email"
                        className="user-input my-3 text-center mx-auto"
                    />

                    <button onClick={onSubmit} className="btn-login mx-auto mt-2">ارسال الكود</button>

                </Col>

            </Row>
            <ToastContainer />
        </Container>
    )
}

export default ForgetPasswordPage