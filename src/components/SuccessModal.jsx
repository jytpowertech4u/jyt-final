import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SuccessModal = ({ open, onClose, title, message }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl px-8 py-10 max-w-sm w-full text-center"
          >
            <div className="flex justify-center mb-6">
              <svg width="90" height="90" viewBox="0 0 90 90">
                <motion.circle
                  cx="45"
                  cy="45"
                  r="40"
                  fill="none"
                  stroke="#16a34a"
                  strokeWidth="5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
                <motion.path
                  d="M27 46 L40 59 L64 32"
                  fill="none"
                  stroke="#16a34a"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
                />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {title || 'Request submitted successfully'}
            </h2>
            <p className="text-gray-600 mb-6">
              {message || 'Our Support Team will contact you shortly.'}
            </p>

            <button
              onClick={onClose}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessModal;
