import React from 'react';
import { motion } from 'framer-motion';
import { Award, Headphones, Package, FolderHeart as HandHeart } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: Award,
      title: 'Government Approved',
      description: 'Authorized APDCL vendor with all necessary certifications and registrations'
    },
    {
      icon: Headphones,
      title: '24×7 Support',
      description: 'Round-the-clock customer support and technical assistance for all your needs'
    },
    {
      icon: Package,
      title: 'Quality Equipment',
      description: 'Premium solar panels and components from trusted international brands'
    },
    {
      icon: HandHeart,
      title: 'Subsidy Assistance',
      description: 'Complete support in applying for and securing government subsidies'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-green-600 to-green-700 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Why Choose JYT PowerTech?</h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mb-4"></div>
          <p className="text-green-100 max-w-2xl mx-auto">
            We combine expertise, quality, and customer service to deliver exceptional solar solutions
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:bg-white/20 transition"
            >
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mb-4 mx-auto">
                <feature.icon className="text-green-700" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">{feature.title}</h3>
              <p className="text-green-100 text-center text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
