import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .eq('published', true)
        .order('sort_order', { ascending: true })
        .limit(2);

      if (!error && data) {
        setImages(data);
      }
    };
    fetchImages();
  }, []);

  if (images.length === 0) return null;

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-800">Our Projects</h2>
          <div className="w-20 h-1 solar-gradient mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our successful solar installations across Assam
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {images.map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer"
            >
              <img
                className="w-full h-80 object-cover group-hover:scale-110 transition duration-300"
                alt={img.title}
                src={img.image_url}
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <span className="text-white font-semibold">{img.category}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button size="lg" className="blue-gradient text-white" asChild>
            <Link to="/projects">View All Projects</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
