import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function HomeSlider () {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 2000,
    };
    return (
        <div className='mb-5'>

        <Slider {...settings}>
            <div>
                    <img src={require("../../images/Slider1.avif")} alt="proudct" />
            </div>
            <div>
                    <img src={require("../../images/Slider2.avif")} alt="proudct" />
            </div>
            <div>
                    <img src={require("../../images/Slider3.avif")} alt="proudct" />
            </div>
        </Slider>
        </div>
    );
}

