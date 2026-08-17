import React from 'react';
import { motion } from 'framer-motion';
import { FileText, IndianRupee, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const SchemesPreview = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-800">Government Solar Schemes</h2>
          <div className="w-20 h-1 solar-gradient mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Take advantage of government subsidies and make solar energy affordable for your home or business
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-lg shadow-lg hover:shadow-xl transition"
          >
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
              <IndianRupee className="text-white" size={32} />
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-gray-800">Subsidy up to Rs 1,30,800</h3>
            <p className="text-gray-600 mb-4">
              Get substantial financial support from APDCL and MNRE schemes for residential solar installations.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle size={16} className="text-green-600 mt-1 flex-shrink-0" />
                <span>Residential subsidy available</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle size={16} className="text-green-600 mt-1 flex-shrink-0" />
                <span>Commercial incentives available</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle size={16} className="text-green-600 mt-1 flex-shrink-0" />
                <span>Easy application process</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg shadow-lg hover:shadow-xl transition"
          >
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <FileText className="text-white" size={32} />
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-gray-800">APDCL Schemes</h3>
            <p className="text-gray-600 mb-4">
              Assam Power Distribution Company Limited offers special schemes for solar rooftop installations with net metering benefits.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle size={16} className="text-blue-600 mt-1 flex-shrink-0" />
                <span>Net metering facility</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle size={16} className="text-blue-600 mt-1 flex-shrink-0" />
                <span>Sell excess power to grid</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle size={16} className="text-blue-600 mt-1 flex-shrink-0" />
                <span>Simplified approval process</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-lg shadow-lg hover:shadow-xl transition"
          >
            <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="text-white" size={32} />
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-gray-800">MNRE Benefits</h3>
            <p className="text-gray-600 mb-4">
              Ministry of New and Renewable Energy provides additional incentives and support for solar energy adoption.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle size={16} className="text-yellow-600 mt-1 flex-shrink-0" />
                <span>Central government subsidy</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle size={16} className="text-yellow-600 mt-1 flex-shrink-0" />
                <span>Tax benefits available</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle size={16} className="text-yellow-600 mt-1 flex-shrink-0" />
                <span>Long-term savings guaranteed</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button size="lg" className="solar-gradient text-white" asChild>
            <Link to="/schemes">Explore All Schemes</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default SchemesPreview;
