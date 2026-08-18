import React, { useState, useEffect } from 'react';
import { Loader2, Upload, Check } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';

const IMAGE_SLOTS = [
  { key: 'logo_url', label: 'Site Logo' },
  { key: 'slide1_url', label: 'Homepage Slider - Image 1' },
  { key: 'slide2_url', label: 'Homepage Slider - Image 2' },
  { key: 'slide3_url', label: 'Homepage Slider - Image 3' },
  { key: 'slide4_url', label: 'Homepage Slider - Image 4' },
  { key: 'slide5_url', label: 'Homepage Slider - Image 5' },
];

const SiteSettingsTab = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploadingKey, setUploadingKey] = useState(null);

  const fetchSettings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('id', 1)
      .single();
    if (!error && data) setSettings(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleUpload = async (key, file) => {
    if (!file) return;
    setUploadingKey(key);

    const ext = file.name.split('.').pop();
    const path = `${key}-${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from('site-assets')
      .upload(path, file, { upsert: true });

    if (uploadError) {
      setUploadingKey(null);
      toast({ variant: 'destructive', title: 'Upload failed', description: uploadError.message });
      return;
    }

    const { data: publicUrlData } = supabase.storage.from('site-assets').getPublicUrl(path);
    const publicUrl = publicUrlData.publicUrl;

    const { error: updateError } = await supabase
      .from('site_settings')
      .update({ [key]: publicUrl, updated_at: new Date().toISOString() })
      .eq('id', 1);

    setUploadingKey(null);

    if (updateError) {
      toast({ variant: 'destructive', title: 'Could not save image', description: updateError.message });
      return;
    }

    setSettings((prev) => ({ ...prev, [key]: publicUrl }));
    toast({ title: 'Image updated', description: 'The change is live on the site now.' });
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="animate-spin text-green-600" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <p className="text-gray-500 text-sm">
        Upload a new image to instantly replace it on the live site — no code changes needed.
      </p>
      <div className="grid md:grid-cols-2 gap-5">
        {IMAGE_SLOTS.map((slot) => {
          const currentUrl = settings?.[slot.key];
          const isUploading = uploadingKey === slot.key;
          return (
            <div key={slot.key} className="bg-white rounded-lg shadow p-4">
              <p className="font-semibold text-gray-800 mb-3">{slot.label}</p>
              <div className="w-full h-36 bg-gray-100 rounded-lg overflow-hidden mb-3 flex items-center justify-center">
                {currentUrl ? (
                  <img src={currentUrl} alt={slot.label} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-400 text-sm">No image set — using default</span>
                )}
              </div>
              <label className="flex items-center justify-center gap-2 cursor-pointer border-2 border-dashed border-gray-300 rounded-lg py-2.5 text-sm text-gray-600 hover:border-green-500 hover:text-green-600 transition">
                {isUploading ? (
                  <>
                    <Loader2 className="animate-spin" size={16} /> Uploading...
                  </>
                ) : currentUrl ? (
                  <>
                    <Check size={16} className="text-green-600" /> Replace image
                  </>
                ) : (
                  <>
                    <Upload size={16} /> Upload image
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={isUploading}
                  onChange={(e) => handleUpload(slot.key, e.target.files[0])}
                />
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SiteSettingsTab;
