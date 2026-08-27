import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import SuccessModal from '@/components/SuccessModal';

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    district: '',
    system_type: '',
    capacity: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const districts = [
    "Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo",
    "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Dima Hasao",
    "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup",
    "Kamrup Metropolitan", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur",
    "Majuli", "Morigaon", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur",
    "South Salmara-Mankachar", "Tinsukia", "Udalguri", "West Karbi Anglong"
  ];

  const systemTypes = ['Hybrid', 'On-Grid', 'Off-Grid'];
  const capacityOptions = ['3 KW', '4 KW', '5 KW', '6 KW', '7 KW', '8 KW', '9 KW', '10 KW', '10+ KW'];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      // Only digits, capped at 10
      const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
      setFormData((prev) => ({ ...prev, phone: digitsOnly }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.phone.length !== 10) {
      toast({
        variant: 'destructive',
        title: 'Invalid phone number',
        description: 'Please enter a valid 10-digit mobile number.',
      });
      return;
    }

    setIsSubmitting(true);

    const { name, phone, email, district, system_type, capacity, message } = formData;

    const { error } = await supabase.from('leads').insert([
      { name, phone, email, district, system_type, capacity, message }
    ]);

    setIsSubmitting(false);

    if (error) {
      console.error('Error saving lead:', error);
      toast({
        variant: 'destructive',
        title: 'Something went wrong',
        description: "We couldn't submit your request. Please try again or call us directly.",
      });
      return;
    }

    setShowSuccess(true);
    setFormData({
      name: '',
      phone: '',
      email: '',
      district: '',
      system_type: '',
      capacity: '',
      message: ''
    });
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - Get Free Solar Consultation | JYT PowerTech</title>
        <meta
          name="description"
          content="Contact JYT PowerTech for free solar consultation, site visit, and quotes. Call us, WhatsApp, or fill the contact form. Located in Guwahati, Assam."
        />
      </Helmet>

      <SuccessModal
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Request submitted successfully"
        message="Our Support Team will contact you shortly."
      />

      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold mb-4 text-gray-800">Contact Us</h1>
            <div className="w-20 h-1 solar-gradient mx-auto mb-4"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get in touch with us for free consultation and site visit
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* FORM SECTION */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Submit Request</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-600 focus:outline-none"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Mobile Number *</label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    maxLength={10}
                    pattern="[0-9]{10}"
                    title="Enter a 10-digit mobile number"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-600 focus:outline-none"
                    placeholder="10-digit mobile number"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-600 focus:outline-none"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">District *</label>
                  <select
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-600 focus:outline-none"
                  >
                    <option value="">Select your district</option>
                    {districts.map((dist) => (
                      <option key={dist} value={dist}>
                        {dist}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">System Type *</label>
                    <select
                      name="system_type"
                      value={formData.system_type}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-600 focus:outline-none"
                    >
                      <option value="">Select system type</option>
                      {systemTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Capacity Required *</label>
                    <select
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-600 focus:outline-none"
                    >
                      <option value="">Select capacity</option>
                      {capacityOptions.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-600 focus:outline-none resize-none"
                    placeholder="Tell us about your requirements..."
                  ></textarea>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full green-gradient text-white text-lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 animate-spin" size={20} />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2" size={20} />
                      Submit Request
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* CONTACT DETAILS SECTION */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Contact Information</h2>
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-lg">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Our Office</h3>
                    <p className="text-gray-600">
                      JYT PowerTech<br />
                      Six Mile, VIP Road, Kamrup(M),<br/>Guwahati - 22, Assam
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-lg">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Phone</h3>
                    <p className="text-gray-600">
                      <a href="tel:+918135033690" className="block hover:text-green-600 transition">+91 81350 33690</a>
                      <a href="tel:+918876022766" className="block hover:text-green-600 transition">+91 88760 22766</a>
                      <a href="tel:+919864810534" className="block hover:text-green-600 transition">+91 98648 10534</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-lg">
                  <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                    <p className="text-gray-600">
                      <a href="mailto:jytpowertech@gmail.com" className="hover:text-green-600 transition">jytpowertech@gmail.com</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-lg">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Working Hours</h3>
                    <p className="text-gray-600">
                      Monday - Saturday: 9:00 AM - 6:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-xl overflow-hidden"
          >
            <h2 className="text-3xl font-bold p-6 bg-gradient-to-r from-green-600 to-blue-600 text-white">Find Us on Map</h2>
            <div className="h-96">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=91.8000%2C26.1300%2C91.8200%2C26.1500&layer=mapnik&marker=26.1400%2C91.8100"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="JYT PowerTech Location"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
