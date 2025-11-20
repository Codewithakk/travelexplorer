import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from './components/Hero';
import DestinationGallery from './components/DestinationGallery';
import DestinationModal from './components/DestinationModal';
import Footer from './components/Footer';
import { unsplashApi, mockDestinations, mockHeroImage } from './services/unsplashApi';

function App() {
  const [photos, setPhotos] = useState([]);
  const [heroImage, setHeroImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGalleryLoading, setIsGalleryLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setIsLoading(true);
    setIsGalleryLoading(true);

    try {
      // Load hero image
      const hero = await unsplashApi.getHeroImage();
      setHeroImage(hero || mockHeroImage);
      setIsLoading(false);

      // Load destination photos
      const destinations = await unsplashApi.getRandomPhotos('travel destination beautiful landscape', 12);
      
      // If API returns empty or fails, use mock data
      if (destinations && destinations.length > 0) {
        setPhotos(destinations);
      } else {
        setPhotos(mockDestinations);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      setHeroImage(mockHeroImage);
      setPhotos(mockDestinations);
    } finally {
      setIsLoading(false);
      setIsGalleryLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setIsGalleryLoading(true);
    
    try {
      const searchResults = await unsplashApi.searchPhotos(query, 1, 12);
      
      if (searchResults && searchResults.length > 0) {
        setPhotos(searchResults);
      } else {
        // If no results, show popular destinations
        const fallbackPhotos = await unsplashApi.getRandomPhotos('travel destination', 12);
        setPhotos(fallbackPhotos.length > 0 ? fallbackPhotos : mockDestinations);
      }
    } catch (error) {
      console.error('Error searching photos:', error);
      setPhotos(mockDestinations);
    } finally {
      setIsGalleryLoading(false);
    }

    // Scroll to gallery
    setTimeout(() => {
      document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handlePhotoClick = async (photo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
    
    // If using mock data or photo doesn't have full details, try to fetch them
    if (!photo.description || !photo.tags) {
      try {
        const fullPhoto = await unsplashApi.getPhoto(photo.id);
        if (fullPhoto) {
          setSelectedPhoto(fullPhoto);
        }
      } catch (error) {
        console.error('Error fetching photo details:', error);
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPhoto(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white"
    >
      {/* Hero Section */}
      <Hero 
        onSearch={handleSearch}
        heroImage={heroImage}
        isLoading={isLoading}
      />

      {/* Destination Gallery */}
      <DestinationGallery 
        photos={photos}
        isLoading={isGalleryLoading}
        onPhotoClick={handlePhotoClick}
      />

      {/* Modal */}
      <DestinationModal
        photo={selectedPhoto}
        isOpen={isModalOpen}
        onClose={closeModal}
      />

      {/* Footer */}
      <Footer />
    </motion.div>
  );
}

export default App;