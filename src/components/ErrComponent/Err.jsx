import React from 'react';
import Error from "../../images/error.svg"
import {Helmet} from 'react-helmet';

const Err = () => {
    return (
        <>
            <Helmet>
                <title>Error 404</title>
            </Helmet>
        <div className='w-50 vh-100 m-auto mt-5'>
            <img className='w-100' src={Error} alt="" />
        </div>
         </>
    );
}

export default Err;
