import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
  return (
    <div className="w-full">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        interval={3000}
        transitionTime={800}
       
      >
        <div>
          <img
            className="max-h-[500px] w-full object-cover"
            src="https://i.ibb.co.com/jk9Mx73c/1000-F-295425800-ISOl-I2g0-BSnp-LAcwt9u-TWzu0tb-Ylu-MB2.jpg"
            alt="Banner 1"
          />
        </div>
        <div>
          <img
            className="max-h-[500px] w-full object-cover"
            src="https://i.ibb.co.com/d4cgSCQc/image-2.jpg"
            alt="Banner 2"
          />
        </div>
        <div>
          <img
            className="max-h-[500px] w-full object-cover"
            src="https://i.ibb.co/n86FkTMC/image-2.jpg"
            alt="Banner 3"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
