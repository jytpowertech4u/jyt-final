import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { FileText, Download, CheckCircle, IndianRupee, Banknote, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const SchemesPage = () => {
  const { toast } = useToast();

  const handleDownload = () => {
    toast({
      title: "Download Feature",
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const schemes = [
    {
      title: 'APDCL Rooftop Solar Scheme',
      subsidy: 'Up to Rs 1,30,800',
      eligibility: ['Residential consumers', 'Commercial establishments', 'Industrial units', 'Institutional buildings'],
      benefits: ['Net metering facility', 'Reduced electricity bills', 'Sell excess power to grid', 'Environmental benefits'],
      process: [
        'Submit application to APDCL',
        'Site inspection by officials',
        'Technical feasibility approval',
        'Installation by authorized vendor',
        'Net meter installation',
        'Subsidy disbursement'
      ]
    },
    {
      title: 'MNRE Solar Subsidy Scheme',
      subsidy: 'Up to ₹78,000',
      eligibility: ['Residential rooftop installations', 'Group housing societies', 'Residential welfare associations'],
      benefits: ['Central government subsidy', 'Tax benefits', 'Accelerated depreciation', 'Long-term savings'],
      process: [
        'Register on MNRE portal',
        'Choose empaneled vendor',
        'System installation',
        'Inspection and commissioning',
        'Subsidy claim submission',
        'Direct benefit transfer'
      ]
    }
  ];

  const documents = [
    'Electricity Bill and APDCL registered Mobile number',
    'Aadhaar Card',
    'PAN Card',
    'Bank Passbook / Cancelled Cheque',
    'Two Passport Size Photos',
  ];

  return (
    <>
      <Helmet>
        <title>Government Solar Schemes & Subsidies | JYT PowerTech</title>
        <meta name="description" content="Learn about APDCL and MNRE solar subsidy schemes. Get up to Rs 1,30,800 subsidy on solar installations. Check eligibility, finance options and application process." />
      </Helmet>

      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold mb-4 text-gray-800">Government Solar Schemes</h1>
            <div className="w-20 h-1 solar-gradient mx-auto mb-4"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Take advantage of government subsidies and make solar energy affordable
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {schemes.map((scheme, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-xl overflow-hidden"
              >
                <div className="solar-gradient p-6 text-white">
                  <h2 className="text-3xl font-bold mb-2">{scheme.title}</h2>
                  <div className="flex items-center gap-2 text-2xl">
                    <IndianRupee size={24} />
                    <span className="font-semibold">Subsidy: {scheme.subsidy}</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">Eligibility</h3>
                    <ul className="space-y-2">
                      {scheme.eligibility.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-700">
                          <CheckCircle size={16} className="text-green-600 mt-1 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">Benefits</h3>
                    <ul className="space-y-2">
                      {scheme.benefits.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-700">
                          <CheckCircle size={16} className="text-blue-600 mt-1 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">Application Process</h3>
                    <ol className="space-y-2">
                      {scheme.process.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-gray-700">
                          <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                            {idx + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
           <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-50 to-cyan-50 p-8 rounded-lg mb-16"
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Easy Finance Options</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-4">
                <Banknote className="text-blue-600 mb-2" size={40}/>
                <h3 className="text-lg font-semibold text-gray-800">Upto 90% Finance</h3>
                <p className="text-gray-600 text-sm">Get your solar system with minimal upfront cost.</p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <Percent className="text-blue-600 mb-2" size={40}/>
                <h3 className="text-lg font-semibold text-gray-800">ROI Starting from 6.00%</h3>
                <p className="text-gray-600 text-sm">Attractive return on investment with our loan partners.</p>
              </div>
               <div className="flex flex-col items-center text-center p-4">
                <FileText className="text-blue-600 mb-2" size={40}/>
                <h3 className="text-lg font-semibold text-gray-800">Minimal Documentation</h3>
                <p className="text-gray-600 text-sm">No income document required for loans up to 2 lakh.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-lg mb-16"
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Required Documents</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {documents.map((doc, index) => (
                <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-lg shadow">
                  <FileText className="text-green-600 flex-shrink-0" size={24} />
                  <span className="text-gray-700">{doc}</span>
                </div>
              ))}
            </div>
             <p className="text-sm text-red-600 mt-4 font-semibold">Note: Spelling of applicant's name should be the same in all the above documents.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-lg shadow-xl"
          >
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Download Forms & Guidelines</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-2 border-gray-200 p-6 rounded-lg hover:border-green-600 transition">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">APDCL Application Form</h3>
                <p className="text-gray-600 mb-4">Download the official application form for APDCL rooftop solar scheme</p>
                <Button onClick={handleDownload} className="w-full green-gradient text-white">
                  <Download className="mr-2" size={18} />
                  Download Form
                </Button>
              </div>
              <div className="border-2 border-gray-200 p-6 rounded-lg hover:border-blue-600 transition">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">MNRE Guidelines</h3>
                <p className="text-gray-600 mb-4">Complete guidelines for MNRE solar subsidy scheme application</p>
                <Button onClick={handleDownload} className="w-full blue-gradient text-white">
                  <Download className="mr-2" size={18} />
                  Download Guidelines
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-12 rounded-lg text-center mt-16"
          >
            <h2 className="text-3xl font-bold mb-4">Need Help with Subsidy Application?</h2>
            <p className="text-xl mb-6 text-green-100">
              Our experts will guide you through the entire process and ensure maximum subsidy
            </p>
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100" asChild>
              <Link to="/contact">Apply for Solar Subsidy</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default SchemesPage;
