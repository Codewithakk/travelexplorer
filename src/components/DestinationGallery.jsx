import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Heart } from 'lucide-react';
import SkeletonLoader from './SkeletonLoader';

const DestinationGallery = ({ photos, isLoading, onPhotoClick }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  if (isLoading) {
    return (
      <section id="gallery" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
              Popular Destinations
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore the world's most beautiful places captured by talented photographers
            </p>
          </div>
          <SkeletonLoader type="gallery" />
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            Popular Destinations
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore the world's most beautiful places captured by talented photographers
          </p>
        </motion.div>

        {/* Photo Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              variants={itemVariants}
              className="group cursor-pointer"
              onClick={() => onPhotoClick(photo)}
            >
              <div className="relative overflow-hidden rounded-xl bg-gray-200 aspect-[4/5] shadow-md group-hover:shadow-xl transition-shadow duration-300">
                {/* Image */}
                <img
                  src={photo.urls.small}
                  alt={photo.alt_description}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-semibold text-lg mb-1 line-clamp-2">
                    {photo.location?.name || photo.alt_description || `Destination ${index + 1}`}
                  </h3>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span className="truncate">
                        {photo.location?.country || 'Beautiful Place'}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4 text-red-400" />
                      <span>{photo.likes || 0}</span>
                    </div>
                  </div>
                </div>

                {/* Quick info badge */}
                <div className="absolute top-4 left-4 bg-black/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  by {photo.user.name}
                </div>
              </div>

              {/* Image info outside */}
              <div className="mt-3 px-1">
                <h4 className="font-medium text-gray-900 truncate">
                  {photo.location?.name || photo.alt_description || 'Amazing Destination'}
                </h4>
                <p className="text-sm text-gray-600">
                  {photo.user.name}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More Button (if needed) */}
        {photos.length >= 12 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-12"
          >
            <button className="bg-primary-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors">
              Load More Destinations
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default DestinationGallery;