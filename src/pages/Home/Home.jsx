import React from 'react';
import Banner from '../Banner/Banner';
import Testimonials from '../Testimonials/Testimonials';
import ServicesSection from '../Services/ServicesSection';
import OurTeam from '../OurTeam/OurTeam';
import WhyChooseUs from '../WhyChooseUs/WhyChooseUs';

const Home = () => {
    return (
        <div className='bg-gray-100 text-black dark:bg-gray-900 dark:text-white'>
            <Banner/>
            <ServicesSection/>
            <Testimonials/>
            <OurTeam/>
            <WhyChooseUs/>
        </div>
    );
};

export default Home;