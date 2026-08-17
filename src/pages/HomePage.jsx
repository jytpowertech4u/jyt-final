import React from 'react';
import { Helmet } from 'react-helmet';
import HeroSlider from '@/components/home/HeroSlider';
import AboutSection from '@/components/home/AboutSection';
import SchemesPreview from '@/components/home/SchemesPreview';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import ServicesPreview from '@/components/home/ServicesPreview';
import Testimonials from '@/components/home/Testimonials';
import Gallery from '@/components/home/Gallery';
import CTASection from '@/components/home/CTASection';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>JYT PowerTech - Authorized APDCL Solar Vendor | Solar Power Solutions in Assam</title>
        <meta name="description" content="JYT PowerTech is a government-registered APDCL solar vendor providing sustainable solar energy solutions across Assam. Get up to 40% subsidy on solar installations." />
      </Helmet>
      
      <div className="pt-32">
        <HeroSlider />
        <AboutSection />
        <SchemesPreview />
        <WhyChooseUs />
        <ServicesPreview />
        <Testimonials />
        <Gallery />
        <CTASection />
      </div>
    </>
  );
};

export default HomePage;
