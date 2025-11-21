import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, User, MapPin, Download, ExternalLink } from 'lucide-react';

const DestinationModal = ({ photo, isOpen, onClose }) => {
  if (!photo) return null;

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 500
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          // Ensure the backdrop covers the whole screen and center the modal
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Modal Container: Added overflow-y-auto and kept max-h-[90vh] */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative bg-white rounded-2xl max-w-4xl max-h-[90vh] w-full shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Content Layout: flex-col for mobile, flex-row for lg screens and up */}
            <div className="flex flex-col lg:flex-row h-full">

              {/* Image Section */}
              <div className="lg:w-2/3 relative flex-shrink-0">
                <img
                  src={photo.urls.regular}
                  alt={photo.alt_description}
                  // Reduced height on mobile (h-64) to leave room for details
                  className="w-full h-64 sm:h-96 lg:h-[600px] object-cover"
                />

                {/* Image overlay with basic info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <h3 className="text-2xl font-display font-semibold text-white mb-2">
                    {photo.location?.name || photo.alt_description || 'Beautiful Destination'}
                  </h3>
                  <div className="flex items-center text-white/90 text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{photo.location?.country || 'Explore this amazing place'}</span>
                  </div>
                </div>
              </div>

              {/* Details Section: Added overflow-y-auto and flex-grow for scrolling on small screens */}
              <div className="lg:w-1/3 p-6 lg:p-8 overflow-y-auto flex-grow">
                <div className="space-y-6">

                  {/* Photographer Info */}
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full">
                      <User className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{photo.user.name}</p>
                      <p className="text-sm text-gray-600">@{photo.user.username}</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Heart className="h-5 w-5 text-red-500" />
                      <span className="font-medium">{photo.likes?.toLocaleString() || '0'} likes</span>
                    </div>
                    {photo.views && (
                      <div className="flex items-center space-x-2 text-gray-600">
                        <ExternalLink className="h-5 w-5" />
                        <span className="font-medium">{photo.views.toLocaleString()} views</span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  {photo.description && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {photo.description}
                      </p>
                    </div>
                  )}

                  {/* Tags */}
                  {photo.tags && photo.tags.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {photo.tags.slice(0, 6).map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium"
                          >
                            {tag.title}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="pt-4 space-y-3">
                    <a
                      href={photo.links?.html}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors"
                    >
                      <ExternalLink className="h-5 w-5" />
                      <span>View on Unsplash</span>
                    </a>

                    <a
                      href={`${photo.links?.download}?force=true`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                    >
                      <Download className="h-5 w-5" />
                      <span>Download</span>
                    </a>
                  </div>

                  {/* Credit */}
                  <p className="text-xs text-gray-500 pt-4 border-t">
                    Photo by {photo.user.name} on Unsplash
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DestinationModal;