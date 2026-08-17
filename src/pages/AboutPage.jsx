import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Award, Target, Eye, Users, Shield, CheckCircle } from 'lucide-react';

const AboutPage = () => {
  const certifications = [
    'APDCL Authorized Vendor',
    'ISO 9001:2015 Certified',
    'MNRE Registered',
    'Electrical Safety Certified'
  ];

  return (
    <>
      <Helmet>
        <title>About Us - JYT PowerTech | Authorized APDCL Solar Vendor</title>
        <meta name="description" content="Learn about JYT PowerTech, a government-registered APDCL solar vendor (Code: 106220) with 1 year of experience in providing solar energy solutions across Assam." />
      </Helmet>

      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold mb-4 text-gray-800">About JYT PowerTech</h1>
            <div className="w-20 h-1 solar-gradient mx-auto mb-4"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Leading the solar revolution in Assam with quality, integrity, and innovation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img className="rounded-lg shadow-xl w-full" alt="JYT PowerTech office and team" src="https://images.unsplash.com/photo-1611365892117-00ac5ef43c90" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2025, JYT PowerTech is at the forefront of the solar energy revolution in Assam. As an authorized APDCL vendor (Code: 106220) and government-registered company, we have successfully completed over 10 solar installations across residential, commercial, and institutional sectors.
              </p>
              <p className="text-gray-600 mb-4">
                Our journey began with a simple mission: to make clean, renewable energy accessible and affordable for everyone in Assam. Over the years, we have grown into a trusted name in the solar industry, known for our quality products, professional service, and unwavering commitment to customer satisfaction.
              </p>
              <p className="text-gray-600">
                Today, we continue to innovate and expand our services, helping customers reduce their carbon footprint while saving significantly on electricity costs.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-lg"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                  <Target className="text-white" size={32} />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
              </div>
              <p className="text-gray-700">
                To empower communities across Assam with sustainable, affordable solar energy solutions while contributing to a cleaner environment and energy independence. We strive to make solar power accessible to every household and business through innovative technology, exceptional service, and comprehensive support.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                  <Eye className="text-white" size={32} />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Our Vision</h2>
              </div>
              <p className="text-gray-700">
                To be the leading solar energy provider in Northeast India, recognized for excellence in quality, innovation, and customer service. We envision a future where every building in Assam harnesses the power of the sun, creating a sustainable and energy-independent region.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Certifications & Registrations</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications.map((cert, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center">
                  <Shield className="w-12 h-12 mx-auto mb-3 text-green-600" />
                  <p className="font-semibold text-gray-800">{cert}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-yellow-50 to-orange-50 p-8 rounded-lg"
          >
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Why Choose Us?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Government Authorized</h3>
                  <p className="text-gray-600 text-sm">Official APDCL vendor (Code: 106220) with all necessary approvals</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Experienced Team</h3>
                  <p className="text-gray-600 text-sm">Skilled professionals with over 1 year of industry experience</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Quality Products</h3>
                  <p className="text-gray-600 text-sm">Premium solar equipment from trusted international brands</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Complete Support</h3>
                  <p className="text-gray-600 text-sm">End-to-end assistance from consultation to after-sales service</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Subsidy Expertise</h3>
                  <p className="text-gray-600 text-sm">Expert guidance in securing maximum government subsidies</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Proven Track Record</h3>
                  <p className="text-gray-600 text-sm">10+ successful installations with satisfied customers</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
