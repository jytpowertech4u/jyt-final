import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Sun, Wrench, FileSearch, Coins as HandCoins, CheckCircle, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ServicesPage = () => {
  const services = [
    {
      icon: Sun,
      title: 'Rooftop Solar Installation',
      description: 'Professional installation of high-efficiency solar panels on residential and commercial rooftops.',
      features: [
        'Site assessment and design',
        'Premium quality solar panels',
        'Professional installation team',
        'Grid connection assistance',
        '25-year performance warranty'
      ]
    },
    {
      icon: Wrench,
      title: 'Maintenance & AMC',
      description: 'Comprehensive maintenance services to ensure optimal performance of your solar system.',
      features: [
        'Regular system inspection',
        'Panel cleaning services',
        'Performance monitoring',
        'Quick repair services',
        'Annual maintenance contracts'
      ]
    },
    {
      icon: FileSearch,
      title: 'Consultancy & Site Survey',
      description: 'Expert consultation and detailed site surveys to design the perfect solar solution.',
      features: [
        'Free site assessment',
        'Energy requirement analysis',
        'Custom system design',
        'ROI calculation',
        'Technical feasibility study'
      ]
    },
    {
      icon: HandCoins,
      title: 'Subsidy Assistance',
      description: 'Complete support in documentation and application for government subsidies.',
      features: [
        'Subsidy eligibility check',
        'Documentation support',
        'Application submission',
        'Follow-up with authorities',
        'Maximum subsidy guarantee'
      ]
    },
    {
      icon: Zap,
      title: 'Supply of Electrical Items',
      description: 'One-stop solution for all your electrical and electronic component needs.',
       features: [
        'Wide range of products',
        'Quality and certified items',
        'Competitive pricing',
        'Bulk order facility',
        'Fast delivery'
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Our Services - Solar Installation & Maintenance | JYT PowerTech</title>
        <meta name="description" content="Comprehensive solar energy services including rooftop installation, maintenance, consultancy, and subsidy assistance in Assam." />
      </Helmet>

      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold mb-4 text-gray-800">Our Services</h1>
            <div className="w-20 h-1 solar-gradient mx-auto mb-4"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive solar and electrical solutions tailored to meet your needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition flex flex-col"
              >
                <div className="solar-gradient p-6 text-white">
                  <service.icon size={48} className="mb-3" />
                  <h2 className="text-2xl font-bold">{service.title}</h2>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-gray-600 mb-4 flex-grow">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle size={16} className="text-green-600 mt-1 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full green-gradient text-white mt-auto" asChild>
                    <Link to="/contact">Get a Quote</Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-12 rounded-lg text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
            <p className="text-xl mb-6 text-green-100">
              Our experts are ready to design a solar system that perfectly fits your requirements
            </p>
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100" asChild>
              <Link to="/contact">Contact Our Team</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ServicesPage;
