import React, {useContext, useState} from 'react';
import {cartContext} from '../../Context/CartContextProvider';
import LoadingScreen from './../LoadingScreenComponent/LoadingScreen';
import toast from 'react-hot-toast';
import EmptyCart from '../EmptyCart/EmptyCart';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet';

const Cart = () => {
    // const [loading, setIsLoading] = useState()
    const {allProudcts,
        totalCartPrice,
        UpdateCount,
        removeProudct,
        numOfCartItems,
        deleteAllproudcts,} = useContext(cartContext)
    async function updateProudctCount (id, count) {
        const res = await UpdateCount(id, count)
        if (res) {
            toast.success("proudcts updated sucsessfully", {position: "top-right"})
        } else {
            toast.error("error", {position: "top-right"})
        }
    }

    async function removeProudctFromCart (id) {
        const res = await removeProudct(id)
        if (res) {
            toast.error("proudct removed succsessfully" , {position:"top-left"});
        } else {
            toast.error("Error in remove proudct", {position: "top-left"});
        }
    }

    if (allProudcts == 0) {
        return <>
            <EmptyCart />
        </>
    }else if (!allProudcts) {
        return <>
            <LoadingScreen></LoadingScreen>
        </>

    }




    return (
        <>
            <Helmet>
                <title>Brands</title>
            </Helmet>
            {allProudcts.length ? <div className="container mb-5">
                <h1>Shop Cart</h1>
                <h5 className='mb-5'>Total Cart price : {totalCartPrice}  &#163; </h5>

                <button onClick={() => {deleteAllproudcts()}} className='btn btn-outline-danger d-block m-auto mt-2 mb-4'><i className="fa-solid fa-trash-can text-danger"></i> Clear Cart</button>
                {allProudcts.map((proudct, idx) => <div key={idx} className="row mb-2 cart-proudct">
                    <div className="col-md-1">
                        <figure>
                            <img className='w-100' src={proudct.product.imageCover} alt={proudct.product.title} />
                        </figure>
                    </div>
                    <div className="col-md-9 ">
                        <h5>{proudct.product.title}</h5>
                        <p className='text-main'>Price : {proudct.price}</p>
                        <span onClick={() => {removeProudctFromCart(proudct.product.id)}} className='cursor-pointer'><i className="fa-solid fa-trash-can text-main"></i> Remove</span>
                    </div>
                    {/* {console.log(proudct.product.id)} */}
                    <div className="col-md-2">
                        <div className=' d-flex justify-content-between align-items-center mt-5'>
                            <button onClick={() => updateProudctCount(proudct.product.id, proudct.count + 1)} className='btn btn-outline-success'>
                                <i className="fa-solid fa-chevron-up"></i>
                            </button>
                            <span>{proudct.count}</span>
                            <button disabled={proudct.count == 1} onClick={() => {updateProudctCount(proudct.product.id, proudct.count - 1)}} className='btn btn-outline-success'>
                                <i className="fa-solid fa-chevron-down"></i>
                            </button>
                        </div>
                    </div>
                </div>)}
                <div className='d-flex w-50 m-auto gap-2'>
                    <Link to={"/paymentCash"} className='btn btn-success text-white d-block m-auto mt-4 mb-4 w-50 '><i className="fa-solid fa-money-bill-wave"></i> Payment Cash</Link >
                    <Link to={"/paymentOnline"} className='btn btn-outline-success   d-block m-auto mt-4 mb-4 w-50 '><i className="fa-regular fa-credit-card"></i> Payment Online</Link >
                </div>
            </div>
                : <EmptyCart />}

        </>
    );
}

export default Cart;
