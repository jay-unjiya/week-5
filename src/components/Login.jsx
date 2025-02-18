import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from 'formik';
import { checkLogin } from "../store/reducers";
import * as Yup from 'yup';
import '../scss/Signup.scss';
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo2.png'; // Import your logo
import Footer from "./Footer";
const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userdata = useSelector((state) => state.products.users)
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Email is required'),
    });
    console.log(userdata)

    const handleLogin = (values)=>{
        let flag= false;
        userdata.map((item,index)=>{
            if(item.email === values.email)
            {
                flag = true;
                
            }
        })
        if(flag)
            {
            // console.log(flag)
            navigate('/')
        }
        else{
            alert('user not found')
        }

    }
    const formik = useFormik({
        initialValues: {

            email: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, e) => {
            handleLogin(values)
        },


    });

    return (
        <>
        <div className="form-container">
            <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(e) }} className="">
                <div className="form-header">
                    <img src={logo} alt="Logo" width="80" height="80" className="logo" />
                    <h2>Login Form</h2>
                </div>
                <input
                    type="text"
                    className='form-control'
                    name="email"
                    placeholder='Enter your email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                />
                {formik.touched.email && formik.errors.email && <div className='Error'>{formik.errors.email}</div>}

                <button className="submit-button" type="submit">Login</button>
                <button type="button" onClick={() => navigate('/signup')}>New In Website? <span>SignUp</span></button>
            </form>
        </div>
        </>
    );
}

export default Login
