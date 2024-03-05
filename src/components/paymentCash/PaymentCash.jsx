import axios from 'axios'
import React, {useContext} from 'react'
import {cartContext} from '../../Context/CartContextProvider'
import {useFormik} from 'formik'
import * as Yup from "yup";
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import {Helmet} from 'react-helmet';


export default function PaymentCash () {
    const {cartID, setNumOfCartItems, setAllproudcts} = useContext(cartContext)
    const nav = useNavigate()

    const Schema = Yup.object({
        city: Yup.string().required("City is required").max(20).min(3),
        phone: Yup.string().required("inter your phone number").matches(/^[0125][0-9]{10}$/, " insert valid Number "),
        details: Yup.string().required("details is required").max(100).min(10),
    })

    function paymentCash ({details, phone, city}) {
        // console.log(value);
        const detils = {
            "shippingAddress": {
                "details": details,
                "phone": phone,
                "city": city
            }
        }
        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${ cartID }`, {detils} , {headers:{token:localStorage.getItem('tkn')}})
            .then((res) => {
                if (res.data.status == "success") {
                    toast.success("Order Confirmed Sucsessfully" , {position:"top-center"})
                    setAllproudcts(0);
                    setNumOfCartItems(0);
                    nav("/home");
            }
            }
            )
            .catch((err) => {
                console.log(err)
            })
    }


    const values = {
        details: "",
        phone: "",
        city: "",
    }

    const Formik = useFormik({
        initialValues: values,

        onSubmit: (values) => {
            paymentCash(values)
        },


        validationSchema: Schema,

    })

    return (<>
        <Helmet>
            <title>Payment</title>
        </Helmet>
        <div className="w-50 m-auto p-4">
            <h2>Shipping Address :</h2>
            <form onSubmit={Formik.handleSubmit}>
                <label className='mb-2' htmlFor="city">City : </label>
                <input onBlur={Formik.handleBlur} onChange={Formik.handleChange} value={Formik.values.city}  id='city' type="text" placeholder='city..' className='form-control mb-2' />
                {Formik.errors.city && Formik.touched.city ? <div className=' alert alert-danger'>{Formik.errors.city}</div> : ""}

                <label className='mb-2' htmlFor="phone">phone : </label>
                <input onBlur={Formik.handleBlur} onChange={Formik.handleChange} value={Formik.values.phone} id='phone' type="text" placeholder='phone..' className='form-control mb-2' />
                {Formik.errors.phone && Formik.touched.phone ? <div className=' alert alert-danger'>{Formik.errors.phone}</div> : "" }

                <label className='mb-2' htmlFor="details">details : </label>
                <textarea onBlur={Formik.handleBlur} onChange={Formik.handleChange} value={Formik.values.details} id='details' type="text" placeholder='details..' className='form-control mb-2' ></textarea>
                {Formik.errors.details && Formik.touched.details ? <div className=' alert alert-danger'>{Formik.errors.details}</div> : ""}
            <div className='d-flex justify-content-evenly gap-2'>
                    <button  className='btn bg-success  text-white  w-50'> <i className="fa-solid fa-money-bill-wave"></i> Confirm order cash</button>
                    {/* < button className='btn btn-outline-success  w-50'> <i className="fa-regular fa-credit-card"></i> order online</button> */}
            </div>
            </form>
        </div>
    </>
)
}
