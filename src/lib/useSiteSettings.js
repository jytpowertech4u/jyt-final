import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

const DEFAULTS = {
  logo_url: '/images/logo.png',
  slide1_url: null,
  slide2_url: null,
  slide3_url: null,
  slide4_url: null,
  slide5_url: null,
  about_video_url: null,
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
          slide1_url: data.slide1_url || null,
          slide2_url: data.slide2_url || null,
          slide3_url: data.slide3_url || null,
          slide4_url: data.slide4_url || null,
          slide5_url: data.slide5_url || null,
          about_video_url: data.about_video_url || null,
        });
      }
    };
    fetchSettings();
  }, []);

  return settings;
}
