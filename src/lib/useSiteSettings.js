import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

const DEFAULTS = {
  logo_url: '/images/logo.png',
  slide1_url: '/images/slide1.jpg',
  slide2_url: '/images/slide2.jpg',
  slide3_url: '/images/slide3.jpg',
  slide4_url: '/images/slide4.jpg',
  slide5_url: '/images/slide5.jpg',
};

export function useSiteSettings() {
  const [settings, setSettings] = useState(DEFAULTS);

  useEffect(() => {
    const fetchSettings = async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', 1)
        .single();

      if (!error && data) {
        setSettings({
          logo_url: data.logo_url || DEFAULTS.logo_url,
          slide1_url: data.slide1_url || DEFAULTS.slide1_url,
          slide2_url: data.slide2_url || DEFAULTS.slide2_url,
          slide3_url: data.slide3_url || DEFAULTS.slide3_url,
          slide4_url: data.slide4_url || DEFAULTS.slide4_url,
          slide5_url: data.slide5_url || DEFAULTS.slide5_url,
        });
      }
    };
    fetchSettings();
  }, []);

  return settings;
}
