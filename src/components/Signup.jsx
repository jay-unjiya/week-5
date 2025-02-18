import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from 'formik';
import { addUser } from "../store/reducers";
import * as Yup from 'yup';
import '../scss/Signup.scss';
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo2.png';
import Footer from './Footer'

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const validationSchema = Yup.object({
        firstName: Yup.string().required('First Name is required'),
        age: Yup.number().positive().integer().min(18).required('Please Enter Age'),
        lastName: Yup.string().required('Last Name is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
    });

    const formik = useFormik({
        initialValues: {
            firstName: '',
            age: '',
            lastName: '',
            email: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, e) => {
            dispatch(addUser({ data: values }));
            navigate('/login');
        },

    });

    return (
       <>
        <div className="form-container">
            <form className='form' onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(e) }}>
                <div className="form-header">
                    <img src={logo} alt="Logo" width="80" height="80" className="logo" />
                    <h2>SignUp Form</h2>
                </div>
                <input
                    type="text"
                    className='form-control'
                    name="firstName"
                    style={{ borderColor: (formik.errors.firstName ? 'red' : 'blue') }}
                    placeholder='Enter your firstname'
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                />
                {formik.touched.firstName && formik.errors.firstName && <div className='Error'>{formik.errors.firstName}</div>}

                <input
                    type="text"
                    className='form-control'
                    name="age"
                    placeholder='Enter your age'
                    value={formik.values.age}
                    onChange={formik.handleChange}
                />
                {formik.touched.age && formik.errors.age && <div className='Error'>{formik.errors.age}</div>}

                <input
                    type="text"
                    className='form-control'
                    name="lastName"
                    placeholder='Enter your lastname'
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                />
                {formik.touched.lastName && formik.errors.lastName && <div className='Error'>{formik.errors.lastName}</div>}

                <input
                    type="text"
                    className='form-control'
                    name="email"
                    placeholder='Enter your email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                />
                {formik.touched.email && formik.errors.email && <div className='Error'>{formik.errors.email}</div>}

                <button className="submit-button" type="submit">Sign Up</button>
                <button onClick={() => navigate('/login')}>alredy have An Account? <span>Login</span> </button>
            </form>
        </div>
       </>
    );
}

export default Signup;
