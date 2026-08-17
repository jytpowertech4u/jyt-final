import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const faqs = [
    {
      category: 'Subsidy & Schemes',
      questions: [
        {
          q: 'How much subsidy can I get for solar installation?',
          a: 'Residential consumers can get up to 40% subsidy from APDCL and MNRE schemes. For a 3kW system, you can receive up to ₹78,000 in subsidy. The exact amount depends on system capacity and your eligibility.'
        },
        {
          q: 'What is the process to apply for solar subsidy?',
          a: 'First, contact an authorized vendor like JYT PowerTech. We will help you submit the application to APDCL, arrange site inspection, complete installation, and assist with subsidy claim submission. The entire process typically takes 2-3 months.'
        },
        {
          q: 'Who is eligible for solar subsidy in Assam?',
          a: 'All residential, commercial, industrial, and institutional electricity consumers in Assam are eligible. You must have a valid electricity connection and own the property where solar panels will be installed.'
        }
      ]
    },
    {
      category: 'Installation & Technical',
      questions: [
        {
          q: 'How long does solar installation take?',
          a: 'A typical residential installation (3-5kW) takes 2-3 days. Commercial installations may take 5-7 days depending on capacity. This includes panel mounting, inverter installation, and electrical connections.'
        },
        {
          q: 'What is net metering and how does it work?',
          a: 'Net metering allows you to sell excess solar power to the grid. Your meter runs backward when you generate more than you consume, and you get credit for the excess power at the same rate you pay for electricity.'
        },
        {
          q: 'Will solar panels work during monsoon season?',
          a: 'Yes, solar panels work in all weather conditions, though efficiency is reduced on cloudy days. Modern panels can generate 10-25% of their capacity even on overcast days. Annual production accounts for seasonal variations.'
        },
        {
          q: 'What maintenance is required for solar panels?',
          a: 'Solar panels require minimal maintenance. Clean panels 2-3 times a year to remove dust and debris. We offer AMC services that include regular inspection, cleaning, and performance monitoring.'
        }
      ]
    },
    {
      category: 'Savings & ROI',
      questions: [
        {
          q: 'How much can I save on electricity bills?',
          a: 'Savings depend on your consumption and system size. On average, customers save 70-90% on electricity bills. A 5kW system can save ₹4,000-6,000 per month, paying for itself in 3-5 years.'
        },
        {
          q: 'What is the lifespan of solar panels?',
          a: 'Quality solar panels last 25-30 years with minimal degradation. Most panels come with a 25-year performance warranty guaranteeing at least 80% efficiency after 25 years.'
        },
        {
          q: 'Can I expand my solar system later?',
          a: 'Yes, solar systems are modular and can be expanded. However, it\'s more cost-effective to install the right capacity initially. We provide detailed energy analysis to determine optimal system size.'
        }
      ]
    },
    {
      category: 'Service & Support',
      questions: [
        {
          q: 'Do you provide after-sales support?',
          a: 'Yes, we provide 24×7 customer support, regular maintenance services, and quick repair assistance. All our installations come with comprehensive warranty coverage.'
        },
        {
          q: 'What warranty do you offer?',
          a: 'Solar panels: 25-year performance warranty, Inverter: 5-10 years warranty, Installation: 5-year workmanship warranty. We also offer extended warranty options.'
        },
        {
          q: 'How do I monitor my solar system performance?',
          a: 'All our systems include monitoring apps that show real-time generation, consumption, and savings. You can track performance on your smartphone from anywhere.'
        }
      ]
    }
  ];

  const filteredFAQs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      faq =>
        faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions - Solar FAQs | JYT PowerTech</title>
        <meta name="description" content="Find answers to common questions about solar installation, subsidies, net metering, savings, warranty, and maintenance services in Assam." />
      </Helmet>

      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold mb-4 text-gray-800">Frequently Asked Questions</h1>
            <div className="w-20 h-1 solar-gradient mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">
              Find answers to common questions about solar energy
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-lg focus:border-green-600 focus:outline-none text-gray-700"
              />
            </div>
          </motion.div>

          {filteredFAQs.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + categoryIndex * 0.1 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-800">{category.category}</h2>
              <Accordion type="single" collapsible className="bg-white rounded-lg shadow-lg">
                {category.questions.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${categoryIndex}-${index}`}>
                    <AccordionTrigger className="text-left px-6 hover:bg-gray-50">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-gray-600">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}

          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-xl">No FAQs found matching your search</p>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-8 rounded-lg text-center mt-12"
          >
            <h2 className="text-2xl font-bold mb-3">Still Have Questions?</h2>
            <p className="mb-6">Our team is here to help you with any queries</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+919864583522" className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                📞 Call Us Now
              </a>
              <a href="https://wa.me/919864583522" target="_blank" rel="noopener noreferrer" className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                💬 WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default FAQPage;
