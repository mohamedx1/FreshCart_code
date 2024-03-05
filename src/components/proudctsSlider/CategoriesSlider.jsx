import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {useQuery} from "@tanstack/react-query"
import axios from 'axios';
import LoadingScreen from '../LoadingScreenComponent/LoadingScreen';
import {Link} from 'react-router-dom';

export default function CategorisSlider () {

    function getCategorisData () {
        return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
    }

   const {data , isLoading} =  useQuery({
        queryKey: ['getCategorisData'], queryFn: getCategorisData,
    })

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 2,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    if (isLoading) {
        return <LoadingScreen/>
    }

    return (
        <div className='mb-5 mt-5'>
            <h4>Shop Popular Categories</h4>
            <Slider {...settings}>

                {data.data.data.map((category, idx) => <div key={idx}>
                    <Link to={"/categoris"}>
                    <img style={{height: "250px", width: "300px"}} className='w-100 rounded-circle p-3 cursor-pointer' src={category.image} alt="proudct" />
                    <h6 className=' text-center mt-2'>{ category.name }</h6>
                    </Link>
                </div> )}

            </Slider>
        </div>
    );
}

