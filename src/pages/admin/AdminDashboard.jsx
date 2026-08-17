import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { LogOut, Inbox, Star, Image as ImageIcon } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import LeadsTab from '@/components/admin/LeadsTab';
import TestimonialsTab from '@/components/admin/TestimonialsTab';
import GalleryTab from '@/components/admin/GalleryTab';

const TABS = [
  { id: 'leads', label: 'Leads', icon: Inbox },
  { id: 'testimonials', label: 'Testimonials', icon: Star },
  { id: 'gallery', label: 'Projects Gallery', icon: ImageIcon },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('leads');

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | JYT PowerTech</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen bg-gray-50 pt-8 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
              <p className="text-gray-500 text-sm">Manage leads, testimonials, and project gallery</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 rounded-lg text-gray-700 hover:bg-gray-100 transition"
            >
              <LogOut size={16} /> Sign Out
            </button>
          </div>

          <div className="flex gap-2 mb-8 flex-wrap">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white shadow'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'leads' && <LeadsTab />}
          {activeTab === 'testimonials' && <TestimonialsTab />}
          {activeTab === 'gallery' && <GalleryTab />}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
