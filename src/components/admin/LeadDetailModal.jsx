import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Mail, MapPin, Zap, Gauge, Calendar, MessageSquare } from 'lucide-react';

const DetailRow = ({ icon: Icon, label, value, href }) => {
  if (!value) return null;
  const content = href ? (
    <a href={href} className="text-gray-800 hover:text-green-600 transition">{value}</a>
  ) : (
    <span className="text-gray-800">{value}</span>
  );
  return (
    <div className="flex items-start gap-3">
      <Icon size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
      <div>
        <p className="text-xs text-gray-400 uppercase tracking-wide">{label}</p>
        {content}
      </div>
    </div>
  );
};

const LeadDetailModal = ({ lead, onClose }) => {
  return (
    <AnimatePresence>
      {lead && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 max-h-[85vh] overflow-y-auto"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{lead.name}</h2>
                <p className="text-sm text-gray-400">Submitted {new Date(lead.created_at).toLocaleString()}</p>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition">
                <X size={22} />
              </button>
            </div>

            <div className="space-y-5">
              <DetailRow icon={Phone} label="Phone" value={lead.phone} href={`tel:${lead.phone}`} />
              <DetailRow icon={Mail} label="Email" value={lead.email} href={lead.email ? `mailto:${lead.email}` : undefined} />
              <DetailRow icon={MapPin} label="District" value={lead.district} />
              <DetailRow icon={Zap} label="System Type" value={lead.system_type} />
              <DetailRow icon={Gauge} label="Capacity Required" value={lead.capacity} />
              <DetailRow icon={Calendar} label="Status" value={lead.status} />
              {lead.message && (
                <div className="flex items-start gap-3">
                  <MessageSquare size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Message</p>
                    <p className="text-gray-700 whitespace-pre-wrap">{lead.message}</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LeadDetailModal;
