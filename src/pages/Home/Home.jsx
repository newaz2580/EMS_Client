import React from 'react';
import Banner from '../Banner/Banner';
import Testimonials from '../Testimonials/Testimonials';
import ServicesSection from '../Services/ServicesSection';
import OurTeam from '../OurTeam/OurTeam';

const Home = () => {
    return (
        <div>
            <Banner/>
            <ServicesSection/>
            <Testimonials/>
            <OurTeam/>
        </div>
    );
};

export default Home;