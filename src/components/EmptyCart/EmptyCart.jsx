import React from 'react';

const EmptyCart = () => {
    return (
        <>
            <div  className='d-flex  justify-content-center align-items-center vh-100'>
                <div>
                    <h1 className='fw-bolder'>your cart is empty</h1>
                    <img className='w-100 me-2' src={require("../../images/shopping.png")} alt="" />
                </div>
            </div>
        </>
    );
}

export default EmptyCart;
