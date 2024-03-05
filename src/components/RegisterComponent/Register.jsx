import React, {useState} from 'react';
import myStyle from "./Register.css";
import {useFormik} from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import {ColorRing} from 'react-loader-spinner'
import {Link, useNavigate} from "react-router-dom";


const Register = () => {
    const [isSuccess, setIsSuccess] = useState(false)
    const [errMessage, setErrMessage] = useState(undefined)
    const [isLoading, setIsLoading] = useState(false)
    const Schema = Yup.object({
        name: Yup.string().min(3, "The name should contain a minimum of 3 characters.").max (20, " The name should contain a minimum of 3 characters and a maximum of 20 characters").required('Name is required'),
        email: Yup.string().email(" Please enter a valid email address :example@example.com").required('email is required'),
        phone: Yup.string().required("inter your phone number").matches( /^[0125][0-9]{9}$/, " insert valid Number " ),
        password: Yup.string().required('Password is required').min(6, "The Password should contain a minimum of 6 characters and a maximum of 20 characters").max(20, "The Password should contain a minimum of 6 characters and a maximum of 20 characters"),
        rePassword: Yup.string().required('rePassword is required').oneOf([Yup.ref("password"), null],"'Passwords must match'")
    })

    const navigate = useNavigate()

    const Submited = async (value) => {
        setIsLoading(true)
        try {
            const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", value);
            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
            }, 2000);
            setIsLoading(false);
            navigate("/home");
            console.log(data);
        }
        catch (err) {
            setErrMessage(err.response.data.message)
            setTimeout(() => {
                setErrMessage(undefined)
            }, 2000);
            setIsLoading(false);
        }

    }
    const values = {
        name: "",
        email: "",
        phone: "",
        password: "",
        rePassword: "",
    }

    const Formik = useFormik({
        initialValues: values,

        onSubmit: (values) => {
            Submited(values);
        },

        validationSchema: Schema,

    })


    return (
        <>
            <div className='registr-form   w-75 m-auto '>
                {isSuccess ? <div className="alert alert-success w-75 text-center m-auto mb-3">Congratolations your acount has been created!</div> : " "}
                {errMessage ? <div className="alert alert-danger w-75 text-center m-auto mb-3">{errMessage}</div>:""}

            <h2 >Register Now:</h2>
            <form action="" onSubmit={Formik.handleSubmit} >
                <label htmlFor="name">Name :</label>
                <input onBlur={Formik.handleBlur}  value={Formik.values.name} onChange={Formik.handleChange} id='name' type="text" className='form-control' placeholder='inter your name..' />
                    {Formik.errors.name && Formik.touched.name ? <div className=' alert alert-danger'>{Formik.errors.name}</div>:"" }
                <label htmlFor="email">E-mail :</label>
                <input onBlur={Formik.handleBlur} value={Formik.values.email}  onChange={Formik.handleChange} id='email' type="email" className='form-control' placeholder='inter your email..' />
                    {Formik.errors.email && Formik.touched.email ? <div className=' alert alert-danger'>{Formik.errors.email}</div>:"" }
                <label htmlFor="phone">phone :</label>
                <input onBlur={Formik.handleBlur} value={Formik.values.phone}   onChange={Formik.handleChange} id='phone' type="number" className='form-control' placeholder='inter your phone number..' />
                    {Formik.errors.phone && Formik.touched.phone ? <div className=' alert alert-danger'>{Formik.errors.phone}</div>:"" }
                <label htmlFor="password">password :</label>
                <input onBlur={Formik.handleBlur} value={Formik.values.password}  onChange={Formik.handleChange} id='password' type="password" className='form-control' placeholder='inter password..' />
                    {Formik.errors.password && Formik.touched.password ? <div className=' alert alert-danger'>{Formik.errors.password}</div>:"" }
                <label htmlFor="rePassword">Repassword :</label>
                <input onBlur={Formik.handleBlur} value={Formik.values.rePassword}  onChange={Formik.handleChange} id='rePassword' type="password" className='form-control' placeholder='inter repassword..' />
                    {Formik.errors.rePassword && Formik.touched.rePassword ? <div className=' alert alert-danger'>{Formik.errors.rePassword}</div>:"" }
                    <button type='submit' className='btn bg-main text-white mt-4 mb-2'>

                        {isLoading ? <ColorRing
                            visible={true}
                            height="35"
                            width="35"
                            ariaLabel="color-ring-loading"
                            wrapperStyle={{}}
                            wrapperClass="color-ring-wrapper"
                            colors={['#eee', '#eee', '#eee', '#eee', '#eee']}
                        /> : "sign Up"}

                    </button>
            </form>
                <span>You Already have Acount ? <Link className=' text-decoration-underline' to={"/login"}>Log in</Link></span>
            </div>
        </>
    );
}

export default Register;
