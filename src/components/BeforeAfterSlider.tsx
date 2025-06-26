import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SlideProps {
  beforeImage: string;
  afterImage: string;
  title: string;
}

const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-80 p-3 rounded-full shadow-lg hover:bg-opacity-100 hover:scale-110 transition-all duration-300 backdrop-blur-sm"
      aria-label="Previous slide"
    >
      <ChevronLeft className="w-5 h-5 text-charcoal-800" />
    </button>
  );
};

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-80 p-3 rounded-full shadow-lg hover:bg-opacity-100 hover:scale-110 transition-all duration-300 backdrop-blur-sm"
      aria-label="Next slide"
    >
      <ChevronRight className="w-5 h-5 text-charcoal-800" />
    </button>
  );
};

const BeforeAfterSlide: React.FC<SlideProps> = ({ beforeImage, afterImage, title }) => {
  return (
    <div className="px-2 py-2">
      <motion.div 
        className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <div className="grid grid-cols-2 gap-1">
          <div className="relative overflow-hidden">
            <img 
              src={beforeImage} 
              alt={`Before - ${title}`} 
              className="w-full h-48 md:h-56 object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute top-2 left-2 bg-charcoal-900 bg-opacity-90 text-white px-3 py-1 text-xs font-medium rounded backdrop-blur-sm">Voor</div>
          </div>
          <div className="relative overflow-hidden">
            <img 
              src={afterImage} 
              alt={`After - ${title}`} 
              className="w-full h-48 md:h-56 object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute top-2 left-2 bg-primary-clean bg-opacity-90 text-white px-3 py-1 text-xs font-medium rounded backdrop-blur-sm">Na</div>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-display font-semibold text-lg text-charcoal-900 leading-tight">{title}</h3>
        </div>
      </motion.div>
    </div>
  );
};

const BeforeAfterSlider: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    pauseOnFocus: true,
    pauseOnDotsHover: true,
    swipeToSlide: true,
    touchThreshold: 10,
    swipe: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    dotsClass: "slick-dots custom-dots",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          speed: 500,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 400,
          arrows: false,
          centerMode: true,
          centerPadding: '20px',
        }
      }
    ]
  };

  const slideData = [
    {
      beforeImage: "/Mercedes S-Klasse Premium Clean/Before.svg",
      afterImage: "/Mercedes S-Klasse Premium Clean/After.svg",
      title: "Mercedes S-Klasse Premium Clean"
    },
    {
      beforeImage: "/Volkswagen Golf Basic Clean/Before.svg",
      afterImage: "/Volkswagen Golf Basic Clean/After.svg",
      title: "Volkswagen Golf Basic Clean"
    },
    {
      beforeImage: "/BMW 3 Serie Dieptereiniging/Before.svg",
      afterImage: "/BMW 3 Serie Dieptereiniging/After.svg",
      title: "BMW 3 Serie Dieptereiniging"
    },
    {
      beforeImage: "/Audi Q5 Premium Exterieur/Before.svg",
      afterImage: "/Audi Q5 Premium Exterieur/After.svg",
      title: "Audi Q5 Premium Exterieur"
    },
    {
      beforeImage: "/Before_After/Before.svg",
      afterImage: "/Before_After/After.svg",
      title: "Ford Focus Premium Clean"
    },
    {
      beforeImage: "/Before_After2/Before.svg",
      afterImage: "/Before_After2/After.svg",
      title: "Volkswagen GTI Dieptereiniging"
    }
  ];

  return (
    <>
      <style>
        {`
          .custom-dots {
            bottom: -40px !important;
          }
          .custom-dots li button:before {
            font-size: 12px !important;
            color: #cbd5e1 !important;
            opacity: 1 !important;
          }
          .custom-dots li.slick-active button:before {
            color: #2BD5EC !important;
          }
          .slick-track {
            display: flex !important;
            align-items: center !important;
          }
          .slick-slide {
            height: auto !important;
          }
          .slick-slide > div {
            height: 100% !important;
          }
        `}
      </style>
      <motion.div
        className="py-4 mobile-scroll"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <Slider {...settings}>
          {slideData.map((slide, index) => (
            <BeforeAfterSlide
              key={index}
              beforeImage={slide.beforeImage}
              afterImage={slide.afterImage}
              title={slide.title}
            />
          ))}
        </Slider>
      </motion.div>
    </>
  );
};

export default BeforeAfterSlider;