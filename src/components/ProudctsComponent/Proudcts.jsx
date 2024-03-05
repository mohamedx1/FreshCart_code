import axios from 'axios';
// import React, {useEffect} from 'react';

import {useQuery} from "@tanstack/react-query"
import LoadingScreen from '../LoadingScreenComponent/LoadingScreen';
import HomeSlider from '../HomeSlider/HomeSlider';
import CategorisSlider from '../proudctsSlider/CategoriesSlider';
import MainProudct from '../MainProudct/MainProudct';
import {useContext, useEffect} from 'react';
import {WishListContext} from '../../Context/WishListContextProvider';
import {Helmet} from 'react-helmet';

// import {useContext} from 'react';
// import {myProudctContext} from '../../Context/ProudctContextProvider';
const Proudcts = () => {

    const {isHearted, gettAllWishListProudcts} = useContext(WishListContext)




// ------------------------------------------ Start Cart-------------------------------------------------------------------

    useEffect(() => {
        gettAllWishListProudcts()
    }, [isHearted ])

    async function getAllProudcts () {
        return axios.get("https://ecommerce.routemisr.com/api/v1/products");
    }


    const {data , isLoading } = useQuery({queryKey: ['getAllproudcts'], queryFn: getAllProudcts});



    if (isLoading) {
        return <>
            <LoadingScreen />
        </>
    }





    return (
        <>
            <Helmet>
                <title>Proudcts</title>
            </Helmet>
            <div className="container">
                <HomeSlider />
                <CategorisSlider></CategorisSlider>
                <div className="row gy-4">
                    {data?.data.data.map((proudct, idx) =>
                        <MainProudct key={idx} proudct={proudct} idx={idx}  />
                    )}

                </div>
            </div>
        </>
    );
}

export default Proudcts;
