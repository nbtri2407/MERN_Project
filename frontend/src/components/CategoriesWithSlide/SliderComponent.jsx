import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner4 from "../../assets/banner1.png";
import banner2 from "../../assets/banner2.png";
import banner3 from "../../assets/banner3.png";
import banner1 from "../../assets/banner4.png";
import banner5 from "../../assets/banner5.png";

const SliderComponent = () => {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };
  return (
    <Slider {...settings}>
      <div>
        <img className="w-full" src={banner1} alt="" />
      </div>
      <div>
        <img className="w-full" src={banner2} alt="" />
      </div>
      <div>
        <img className="w-full" src={banner3} alt="" />
      </div>
      <div>
        <img className="w-full" src={banner4} alt="" />
      </div>
      <div>
        <img className="w-full" src={banner5} alt="" />
      </div>
    </Slider>
  );
};

export default SliderComponent;
