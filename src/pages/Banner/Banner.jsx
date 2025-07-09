import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

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
                        src="https://i.ibb.co/vCPL0xtB/jonathan-zerger-yzz-Jbq-Q1-O-Y-unsplash.jpg"
                        alt="Banner 1"
                    />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img
                        className="max-h-[500px] w-full object-cover"
                        src="https://i.ibb.co/jvRxZ7G5/neom-e-OWabm-CNEdg-unsplash.jpg"
                        alt="Banner 2"
                    />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img
                        className="max-h-[500px] w-full object-cover"
                        src="https://i.ibb.co/LDfTrYtZ/mesut-kaya-e-Ocyhe5-9s-Q-unsplash.jpg"
                        alt="Banner 3"
                    />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;
