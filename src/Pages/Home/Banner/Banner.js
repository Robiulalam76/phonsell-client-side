import React, { Component } from "react";
import Slider from "react-slick";

export default class SimpleSlider extends Component {
    render() {

        const settings = {
            dots: true,
            infinite: true,
            speed: 1000,
            autoplay: true,
            autoplaySpeed: 2000,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
            <div>
                <Slider {...settings}>
                    <div>
                        <img className="h-96 w-full" src="https://rukminim1.flixcart.com/flap/1800/1800/image/3ae7fea26c98e040.png?q=80" alt="" />
                    </div>
                    <div>
                        <img className="h-96 w-full" src="https://www.mobiles.co.uk/blog/content/images/size/w2000/2017/09/upload_75234205_blog-header1.jpg" alt="" />
                    </div>
                    <div>
                        <img className="h-96 w-full" src="https://rukminim1.flixcart.com/flap/1800/1800/image/3ae7fea26c98e040.png?q=80" alt="" />
                    </div>
                    <div>
                        <img className="h-96 w-full" src="https://www.bajajfinserv.in/Blog_Image_Indian_Mobile_Brands_CP_Banner_060820_790_345_Phones.jpg" alt="" />
                    </div>


                </Slider>
            </div>
        );
    };
}
