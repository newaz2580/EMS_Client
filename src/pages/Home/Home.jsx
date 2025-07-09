import React from 'react';
import Banner from '../Banner/Banner';
import Testimonials from '../Testimonials/Testimonials';
import ServicesSection from '../Services/ServicesSection';

const Home = () => {
    return (
        <div>
            <Banner/>
            <ServicesSection/>
            <Testimonials/>
        </div>
    );
};

export default Home;