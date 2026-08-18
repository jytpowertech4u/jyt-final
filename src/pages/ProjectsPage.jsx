import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Building, Home, Factory, School, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

const ProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .eq('published', true)
        .order('sort_order', { ascending: true });

      if (!error && data) {
        setProjects(data);
      }
      setLoading(false);
    };
    fetchProjects();
  }, []);

  const filters = [
    { id: 'all', label: 'All Projects', icon: Building },
    { id: 'Residential', label: 'Residential', icon: Home },
    { id: 'Commercial', label: 'Commercial', icon: Building },
    { id: 'Industrial', label: 'Industrial', icon: Factory },
    { id: 'Institutional', label: 'Institutional', icon: School },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  const ongoingProjects = filteredProjects.filter((p) => p.status === 'ongoing');
  const completedProjects = filteredProjects.filter((p) => p.status !== 'ongoing');

  const ProjectCard = ({ project, index }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.08 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition group"
    >
      <div className="relative overflow-hidden">
        <img
          className="w-full h-64 object-cover group-hover:scale-110 transition duration-300"
          alt={project.title}
          src={project.image_url}
        />
        <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {project.category}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-800">{project.title}</h3>
      </div>
    </motion.div>
  );

  return (
    <>
      <Helmet>
        <title>Our Projects - Solar Installations Gallery | JYT PowerTech</title>
        <meta name="description" content="Explore our ongoing and completed solar installation projects across Assam." />
      </Helmet>

      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold mb-4 text-gray-800">Our Projects</h1>
            <div className="w-20 h-1 solar-gradient mx-auto mb-4"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our solar installations across Assam
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition ${
                  activeFilter === filter.id
                    ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                }`}
              >
                <filter.icon size={20} />
                {filter.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-green-600" size={40} />
            </div>
          ) : (
            <>
              {ongoingProjects.length > 0 && (
                <div className="mb-16">
                  <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse"></span>
                    Ongoing Projects
                  </h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    {ongoingProjects.map((project, index) => (
                      <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                  </div>
                </div>
              )}

              {completedProjects.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-green-600"></span>
                    Completed Projects
                  </h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    {completedProjects.map((project, index) => (
                      <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                  </div>
                </div>
              )}

              {filteredProjects.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-xl">No projects found in this category</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectsPage;
