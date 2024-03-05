import React, {useContext, useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import {ColorRing} from 'react-loader-spinner'
import {Link, useNavigate} from "react-router-dom";
import {myContext} from '../../Context/AuthContextProvider';

const Login = () => {
    const {setToken} = useContext(myContext)
    const [isSuccess, setIsSuccess] = useState(false)
    const [errMessage, setErrMessage] = useState(undefined)
    const [isLoading, setIsLoading] = useState(false)
    const Schema = Yup.object({
        email: Yup.string().email(" Please enter a valid email address :example@example.com").required('email is required'),
        password: Yup.string().required('Password is required').min(6, "The Password should contain a minimum of 6 characters and a maximum of 20 characters").max(20, "The Password should contain a minimum of 6 characters and a maximum of 20 characters"),
    })

    const navigate = useNavigate()

    const Submited = async (value) => {
        setIsLoading(true)
        try {
            const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", value);
            if (data.message == "success") {
                localStorage.setItem("tkn", data.token)
                setIsSuccess(true);
                setTimeout(() => {
                    setIsSuccess(false);
                    navigate("/home");
                }, 2000);
                setIsLoading(false);
                setToken(data.token);
            }
            }
        catch (err) {
            setErrMessage(err.response.data.message)
            setTimeout(() => {
                setErrMessage("")
            }, 2000);
            setIsLoading(false);
            console.log("err")
        }

    }
    const values = {
        email: "",
        password: "",
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
                {isSuccess ? <div className="alert alert-success w-75 text-center m-auto mb-3"> Wlcome Back!</div> : " "}
                {errMessage ? <div className="alert alert-danger w-75 text-center m-auto mb-3">{errMessage}</div> : ""}

                <h2 >Login Now:</h2>
                <form action="" onSubmit={Formik.handleSubmit} >
                    <label htmlFor="email">E-mail :</label>
                    <input onBlur={Formik.handleBlur} value={Formik.values.email} onChange={Formik.handleChange} id='email' type="email" className='form-control' placeholder='inter your email..' />
                    {Formik.errors.email && Formik.touched.email ? <div className=' alert alert-danger'>{Formik.errors.email}</div> : ""}
                    <label htmlFor="password">password :</label>
                    <input onBlur={Formik.handleBlur} value={Formik.values.password} onChange={Formik.handleChange} id='password' type="password" className='form-control' placeholder='inter password..' />
                    {Formik.errors.password && Formik.touched.password ? <div className=' alert alert-danger'>{Formik.errors.password}</div> : ""}
                    <button type='submit' className='btn bg-main text-white mt-4 mb-2'>

                        {isLoading ? <ColorRing
                            visible={true}
                            height="35"
                            width="35"
                            ariaLabel="color-ring-loading"
                            wrapperStyle={{}}
                            wrapperClass="color-ring-wrapper"
                            colors={['#eee', '#eee', '#eee', '#eee', '#eee']}
                        /> : "Login"}

                    </button>
                </form>
                <span>Creat Account <Link className=' text-decoration-underline' to={"/register"}>Sign Up</Link></span>
            </div>
        </>
    );
}

export default Login;
