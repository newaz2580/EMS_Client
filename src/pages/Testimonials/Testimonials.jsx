import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    name: "Sarah Ahmed",
    image: "https://i.ibb.co/5hvQk2Jj/girls1.jpg",
    text: "Joining this company was one of the best decisions I’ve made. The work culture is supportive and inspiring.",
  },
  {
    name: "John Rahman",
    image: "https://i.ibb.co/0jkrSXw3/image.jpg",
    text: "I truly appreciate the leadership team for their clear communication and vision. It makes daily tasks much more meaningful.",
  },
  {
    name: "Anika Sultana",
    image: "https://i.ibb.co/v4KtTPct/g2.jpg",
    text: "The level of trust and flexibility offered here allows me to perform at my best while maintaining work-life balance.",
  },
  {
    name: "Tanvir Hasan",
    image: "https://i.ibb.co/q3LfCFMX/image-11.jpg",
    text: "Every project feels like a chance to learn and grow. My ideas are always welcomed, and that keeps me motivated.",
  },
  {
    name: "Emily Chowdhury",
    image: "https://i.ibb.co/nqzVCJgK/women1.jpg",
    text: "It’s refreshing to be in a company that actually listens to its employees and acts on feedback.",
  },
  {
    name: "Rezaul Karim",
    image: "https://i.ibb.co/1tgzcWRL/istockphoto-2160741889-612x612.webp",
    text: "Great team, strong ethics, and clear goals. I always feel like my contributions matter here.",
  },
  {
    name: "Nusrat Jahan",
    image: "https://i.ibb.co/xqpJ0frh/g3.webp",
    text: "From onboarding to project delivery, everything is streamlined. It’s a joy to be part of such a well-run organization.",
  },
  {
    name: "Imran Hossain",
    image: "https://i.ibb.co/ccJ62qpT/download.jpg",
    text: "This company helped me level up my career. The mentorship and growth opportunities are unmatched.",
  },
];

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="max-w-11/12 mx-auto  my-5 bg-gray-100 dark:bg-gray-900">
      <h2 className="text-center text-3xl font-bold py-5">Testimonials</h2>
      <Slider {...settings}>
        {testimonials.map((item, index) => (
          <div key={index} className="px-2">
            <div className="bg-white dark:bg-green-950 dark:text-white rounded-lg shadow p-4 h-64 my-5 text-center">
              <img
                src={item.image}
                alt={item.name}
                className="mx-auto w-24 h-24 rounded-full object-cover mb-2"
              />
              <h3 className="text-lg font-semibold text-black dark:text-white">{item.name}</h3>
              <p className="text-black mt-2 text-sm dark:text-white">{item.text}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonials;
