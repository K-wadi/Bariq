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
      className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-70 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-all"
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
      className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-70 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-all"
      aria-label="Next slide"
    >
      <ChevronRight className="w-5 h-5 text-charcoal-800" />
    </button>
  );
};

const BeforeAfterSlide: React.FC<SlideProps> = ({ beforeImage, afterImage, title }) => {
  return (
    <div className="px-1 py-2">
      <div className="bg-white rounded-lg overflow-hidden shadow-md">
        <div className="grid grid-cols-2 gap-1">
          <div className="relative">
            <img 
              src={beforeImage} 
              alt={`Before - ${title}`} 
              className="w-full h-56 object-cover"
            />
            <div className="absolute top-2 left-2 bg-charcoal-900 text-white px-3 py-1 text-xs font-medium rounded">Voor</div>
          </div>
          <div className="relative">
            <img 
              src={afterImage} 
              alt={`After - ${title}`} 
              className="w-full h-56 object-cover"
            />
            <div className="absolute top-2 left-2 bg-primary-clean text-white px-3 py-1 text-xs font-medium rounded">Na</div>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-display font-semibold text-lg">{title}</h3>
        </div>
      </div>
    </div>
  );
};

const BeforeAfterSlider: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
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
    <motion.div
      className="py-4"
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
  );
};

export default BeforeAfterSlider;