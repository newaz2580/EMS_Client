import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
  return (
    <div className="max-w-screen-2xl mx-auto">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        interval={3000}
        transitionTime={800}
        // stopOnHover={false}
        // // swipeable={true}
        // emulateTouch={false}
      >
        <div>
          <img
            className="max-h-[500px] w-full object-cover"
            src="https://i.ibb.co/gbh0VYvk/banner-1.webp"
            alt="Banner 1"
          />
        </div>
        <div>
          <img
            className="max-h-[500px] w-full object-cover"
            src="https://i.ibb.co/674ttPz9/banner-2.jpg"
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
