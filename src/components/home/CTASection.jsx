import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Go Solar?</h2>
          <p className="text-xl mb-8 text-green-100">
            Get a free site visit and consultation. Check your subsidy eligibility today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8" asChild>
              <Link to="/contact">
                <Calendar className="mr-2" size={20} />
                Request Free Site Visit
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-lg px-8" asChild>
              <Link to="/schemes">
                <Phone className="mr-2" size={20} />
                Check Subsidy Eligibility
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
