import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import LoadingScreen from '../LoadingScreenComponent/LoadingScreen';
import {Helmet} from 'react-helmet';

export default function Brands() {
    function getBrandssData () {
        return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
    }

    const {data, isLoading} = useQuery({
        queryKey: ['getBrandssData'], queryFn: getBrandssData,
    })

    if (isLoading) {
        return <LoadingScreen></LoadingScreen>;
    }

    console.log(data.data.data);

    return (
        <>
            <Helmet>
                <title>Brands</title>
            </Helmet>
        <div className="container">
            <h1 className='mb-4'>Brands :</h1>
            <div className="row">
                {data.data.data.map((brand, idx) =>
                    <div key={idx} className="col-lg-2 col-md-4 col-sm-6 mb-sm-3   rounded-2 position-relative main-div ">
                        <div style={{height: "350px"}} className=' shadow p-2 product '>
                            <img className='w-100 ' style={{height: "200px"}} src={brand.image} alt={brand.name} />
                            <h4 className='text-main'>{brand.name}</h4>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </>
    )
}
