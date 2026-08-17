import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Wrench, FileSearch, Coins as HandCoins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ServicesPreview = () => {
  const services = [
    {
      icon: Sun,
      title: 'Rooftop Solar Installation',
      description: 'Professional installation of solar panels on residential and commercial rooftops with optimal efficiency'
    },
    {
      icon: Wrench,
      title: 'Maintenance & AMC',
      description: 'Comprehensive maintenance services and annual maintenance contracts for hassle-free operation'
    },
    {
      icon: FileSearch,
      title: 'Consultancy & Survey',
      description: 'Expert site surveys and consultancy to design the perfect solar solution for your property'
    },
    {
      icon: HandCoins,
      title: 'Subsidy Assistance',
      description: 'Complete support in documentation and application for government subsidies and net metering'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-800">Our Services</h2>
          <div className="w-20 h-1 solar-gradient mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive solar energy solutions tailored to meet your specific needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition group"
            >
              <div className="w-16 h-16 solar-gradient rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <service.icon className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <Button variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-50" asChild>
                <Link to="/contact">Get a Quote</Link>
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button size="lg" className="green-gradient text-white" asChild>
            <Link to="/services">View All Services</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesPreview;
