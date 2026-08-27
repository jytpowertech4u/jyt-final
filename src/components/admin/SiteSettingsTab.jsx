import React, { useState, useEffect } from 'react';
import { Loader2, Upload, Check, Video } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';

const IMAGE_SLOTS = [
  {
    key: 'logo_url',
    label: 'Site Logo',
    hint: 'Square, 512 x 512px. Transparent PNG works best. Any format accepted (PNG, JPG, WEBP, SVG).',
  },
  {
    key: 'slide1_url',
    label: 'Homepage Slider - Image 1',
    hint: 'Landscape, 1920 x 1080px (16:9). Wide/high-res photos avoid awkward cropping on large screens. JPG, PNG or WEBP, up to 8MB.',
  },
  {
    key: 'slide2_url',
    label: 'Homepage Slider - Image 2',
    hint: 'Landscape, 1920 x 1080px (16:9). Wide/high-res photos avoid awkward cropping on large screens. JPG, PNG or WEBP, up to 8MB.',
  },
  {
    key: 'slide3_url',
    label: 'Homepage Slider - Image 3',
    hint: 'Landscape, 1920 x 1080px (16:9). Wide/high-res photos avoid awkward cropping on large screens. JPG, PNG or WEBP, up to 8MB.',
  },
  {
    key: 'slide4_url',
    label: 'Homepage Slider - Image 4',
    hint: 'Landscape, 1920 x 1080px (16:9). Wide/high-res photos avoid awkward cropping on large screens. JPG, PNG or WEBP, up to 8MB.',
  },
  {
    key: 'slide5_url',
    label: 'Homepage Slider - Image 5',
    hint: 'Landscape, 1920 x 1080px (16:9). Wide/high-res photos avoid awkward cropping on large screens. JPG, PNG or WEBP, up to 8MB.',
  },
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

  const handleVideoUpload = async (file) => {
    if (!file) return;
    setUploadingKey('about_video_url');

    const ext = file.name.split('.').pop();
    const path = `about-video-${Date.now()}.${ext}`;

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
      .update({ about_video_url: publicUrl, updated_at: new Date().toISOString() })
      .eq('id', 1);

    setUploadingKey(null);

    if (updateError) {
      toast({ variant: 'destructive', title: 'Could not save video', description: updateError.message });
      return;
    }

    setSettings((prev) => ({ ...prev, about_video_url: publicUrl }));
    toast({ title: 'Video updated', description: 'The change is live on the homepage now.' });
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="animate-spin text-green-600" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-gray-500 text-sm mb-4">
          Upload a new image to instantly replace it on the live site — no code changes needed. Each slot
          shows the recommended size below it so your image displays fully and correctly.
        </p>
        <div className="grid md:grid-cols-2 gap-5">
          {IMAGE_SLOTS.map((slot) => {
            const currentUrl = settings?.[slot.key];
            const isUploading = uploadingKey === slot.key;
            return (
              <div key={slot.key} className="bg-white rounded-lg shadow p-4">
                <p className="font-semibold text-gray-800 mb-1">{slot.label}</p>
                <p className="text-xs text-gray-400 mb-3">{slot.hint}</p>
                <div className="w-full h-36 bg-gray-100 rounded-lg overflow-hidden mb-3 flex items-center justify-center">
                  {currentUrl ? (
                    <img src={currentUrl} alt={slot.label} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-400 text-sm px-4 text-center">Not uploaded yet — nothing will show on the site until you add one</span>
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

      <div>
        <p className="font-semibold text-gray-800 mb-1 flex items-center gap-2">
          <Video size={18} /> About Section Video (Homepage)
        </p>
        <p className="text-xs text-gray-400 mb-3">
          Landscape video, 1280 x 720px (16:9) or larger. MP4 format recommended (also accepts WEBM/MOV).
          Keep it under ~30MB for fast loading — it will autoplay muted and loop on the homepage.
        </p>
        <div className="bg-white rounded-lg shadow p-4 max-w-xl">
          <div className="w-full aspect-video bg-gray-100 rounded-lg overflow-hidden mb-3 flex items-center justify-center">
            {settings?.about_video_url ? (
              <video src={settings.about_video_url} className="w-full h-full object-cover" muted autoPlay loop playsInline />
            ) : (
              <span className="text-gray-400 text-sm px-4 text-center">No video uploaded yet</span>
            )}
          </div>
          <label className="flex items-center justify-center gap-2 cursor-pointer border-2 border-dashed border-gray-300 rounded-lg py-2.5 text-sm text-gray-600 hover:border-green-500 hover:text-green-600 transition">
            {uploadingKey === 'about_video_url' ? (
              <>
                <Loader2 className="animate-spin" size={16} /> Uploading...
              </>
            ) : settings?.about_video_url ? (
              <>
                <Check size={16} className="text-green-600" /> Replace video
              </>
            ) : (
              <>
                <Upload size={16} /> Upload video
              </>
            )}
            <input
              type="file"
              accept="video/*"
              className="hidden"
              disabled={uploadingKey === 'about_video_url'}
              onChange={(e) => handleVideoUpload(e.target.files[0])}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default SiteSettingsTab;
