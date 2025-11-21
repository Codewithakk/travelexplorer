import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Heart, User } from 'lucide-react';
import SkeletonLoader from './SkeletonLoader';

const DestinationGallery = ({ photos, isLoading, onPhotoClick }) => {
  const [activeId, setActiveId] = useState(null);

  // ... (containerVariants and itemVariants remain the same) ...
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  /**
   * FIX: Handles click/tap interaction on all devices.
   * On touch devices, the first tap shows details (sets activeId).
   * The second tap opens the photo (calls onPhotoClick).
   */
  const handlePhotoInteraction = useCallback((photo) => {
    if (activeId === photo.id) {
      // 2nd tap on the same card: Open the photo
      onPhotoClick(photo);
      setActiveId(null);
    } else {
      // 1st tap (or click): Show details for this card
      setActiveId(photo.id);
    }
  }, [activeId, onPhotoClick]);


  // ... (isLoading state remains the same) ...
  if (isLoading) {
    return (
      <section id="gallery" className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Popular Destinations
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore breathtaking places captured by talented photographers
            </p>
          </div>
          <SkeletonLoader type="gallery" />
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Popular Destinations
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the world's most stunning locations
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6"
        >
          {photos.map((photo) => {
            const isActive = activeId === photo.id;

            return (
              <motion.div
                key={photo.id}
                variants={itemVariants}
                whileTap={{ scale: 0.98 }}
                className="group relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"

                // Desktop: Hover sets and clears the active ID
                onMouseEnter={() => setActiveId(photo.id)}
                onMouseLeave={() => setActiveId(null)}

                // Mobile/Touch: Click/Tap toggles the active ID using the unified handler
                onClick={() => handlePhotoInteraction(photo)}

              // Removed redundant onTouch handlers
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                  {/* Image */}
                  <img
                    src={photo.urls.small}
                    alt={photo.alt_description || 'Destination'}
                    // FIX: Apply scale-up when active OR on hover
                    className={`w-full h-full object-cover transition-transform duration-700 ${isActive ? 'scale-110' : 'group-hover:scale-110'
                      }`}
                    loading="lazy"
                  />

                  {/* Gradient Overlay - appears when active OR on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-400 ${
                      // FIX: Ensure the overlay is visible when active OR on hover
                      isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}
                  />

                  {/* Main Details (Title, location, likes) */}
                  <div
                    className={`absolute inset-0 flex flex-col justify-end p-4 text-white transition-all duration-400 ${isActive
                        ? 'opacity-100 translate-y-0'
                        // FIX: Show details when active OR on hover
                        : 'opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0'
                      }`}
                  >
                    <h3 className="font-bold text-lg leading-tight line-clamp-2 mb-2">
                      {photo.location?.name || photo.alt_description || 'Stunning View'}
                    </h3>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 truncate max-w-[70%]">
                        <MapPin className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">
                          {photo.location?.city
                            ? `${photo.location.city}, ${photo.location.country}`
                            : photo.location?.country || 'Earth'}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4 text-red-400 fill-red-400" />
                        <span className="font-medium">
                          {photo.likes?.toLocaleString() || 0}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Photographer Badge */}
                  <div
                    className={`absolute top-3 left-3 bg-white/20 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-opacity duration-300 ${
                      // FIX: Show badge when active OR on hover
                      isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}
                  >
                    <User className="h-3.5 w-3.5" />
                    {photo.user.name.split(' ')[0]}
                  </div>
                </div>

                {/* Always Visible Bottom Info */}
                <div className="p-4 pt-3 bg-white">
                  <h4 className="font-semibold text-gray-900 line-clamp-1 text-base">
                    {photo.location?.name || photo.alt_description || 'Beautiful Place'}
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">
                    by {photo.user.name}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        {/* ... (Load More button remains the same) ... */}
        {photos.length >= 12 && (
          <div className="text-center mt-16">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Load More Destinations
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
};

export default DestinationGallery;