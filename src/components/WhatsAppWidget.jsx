import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppWidget = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/918135033690?text=Hello! I would like to know more about solar solutions.', '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="whatsapp-float"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} />
    </button>
  );
};

export default WhatsAppWidget;
