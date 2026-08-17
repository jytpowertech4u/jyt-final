import React from 'react';
import { motion } from 'framer-motion';
import { Award, Shield, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AboutSection = () => {
  const stats = [
    { icon: Award, label: 'Years Experience', value: '1+' },
    { icon: Users, label: 'Happy Customers', value: '10+' },
    { icon: Zap, label: 'MW Installed', value: '0.1+' },
    { icon: Shield, label: 'Warranty Years', value: '5' }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img 
              className="rounded-lg shadow-xl w-full" 
              alt="JYT PowerTech team installing solar panels"
             src="./assets/images/AboutSection.jpg" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-800">About JYT PowerTech</h2>
            <div className="w-20 h-1 solar-gradient mb-6"></div>
            <p className="text-gray-600 mb-4">
              JYT PowerTech is a government-registered and APDCL-authorized solar vendor committed to bringing sustainable energy solutions to Assam. With 1 year of experience, we specialize in residential, commercial, and institutional solar installations.
            </p>
            <p className="text-gray-600 mb-6">
              Our mission is to empower communities with clean, renewable energy while helping customers save on electricity costs and contribute to a greener planet. We provide end-to-end solutions including consultation, installation, maintenance, and subsidy assistance.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md text-center">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            <Button className="green-gradient text-white" asChild>
              <Link to="/about">Learn More About Us</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
