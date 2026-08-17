import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Authorized APDCL Solar Vendor',
      subtitle: 'Government Registered & Certified',
      description: 'Your trusted partner for solar energy solutions in Assam',
      cta: 'Learn More',
      link: '/about',
      image: './assets/images/slide1.jpg',
    },
    {
      title: 'Go Green with Solar Energy',
      subtitle: 'Sustainable Power for a Better Tomorrow',
      description: 'Reduce your carbon footprint and electricity bills',
      cta: 'Our Services',
      link: '/services',
      image: './assets/images/slide2.jpg',
    },
    {
      title: 'Subsidy up to Rs 1,30,800',
      subtitle: 'Government Solar Schemes Available',
      description: 'Take advantage of APDCL and MNRE subsidies',
      cta: 'Check Eligibility',
      link: '/schemes',
      image: './assets/images/slide3.jpg',
    },
    {
      title: 'Empowering Assam with Solar',
      subtitle: '10+ Successful Installations',
      description: 'Join satisfied customers across Assam',
      cta: 'View Projects',
      link: '/projects',
      image: './assets/images/slide4.jpg',
    },
    {
      title: 'Install Solar & Save More',
      subtitle: 'Professional Installation & Support',
      description: '24×7 customer support and maintenance services',
      cta: 'Get Free Quote',
      link: '/contact',
      image: './assets/images/slide5.jpg',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {/* ✅ Fullscreen Image */}
          <img
            src={slides[currentSlide].image}
            alt={`Solar panel installation - ${slides[currentSlide].title}`}
            className="w-full h-full object-cover object-center"
          />

          {/* ✅ Dark overlay for readability */}
          <div className="absolute inset-0 bg-black/40" />

          {/* ✅ Centered Text Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-6 max-w-3xl mx-auto">
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-6xl font-bold mb-4"
              >
                {slides[currentSlide].title}
              </motion.h1>

              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xl md:text-2xl mb-2 text-yellow-300"
              >
                {slides[currentSlide].subtitle}
              </motion.p>

              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl mb-8"
              >
                {slides[currentSlide].description}
              </motion.p>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Button size="lg" className="solar-gradient text-white text-lg px-8" asChild>
                  <Link to={slides[currentSlide].link}>{slides[currentSlide].cta}</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition"
        aria-label="Previous slide"
      >
        <ChevronLeft size={32} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition"
        aria-label="Next slide"
      >
        <ChevronRight size={32} />
      </button>

      {/* Slide Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === currentSlide ? 'bg-yellow-400 w-8' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
