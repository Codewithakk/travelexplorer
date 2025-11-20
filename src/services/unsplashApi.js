// Unsplash API configuration
const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY || 'YOUR_UNSPLASH_ACCESS_KEY';
const UNSPLASH_API_URL = 'https://api.unsplash.com';

// Demo data for testing when API fails
const demoData = [
  {
    id: 'demo1',
    alt_description: 'Beautiful mountain landscape',
    urls: {
      small: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      regular: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      full: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200'
    },
    user: { name: 'Demo Photographer', username: 'demo_user' },
    likes: 1250,
    location: { title: 'Swiss Alps' },
    tags: [{ title: 'mountains' }, { title: 'landscape' }, { title: 'nature' }]
  },
  {
    id: 'demo2',
    alt_description: 'Tropical beach paradise',
    urls: {
      small: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400',
      regular: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
      full: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200'
    },
    user: { name: 'Beach Photographer', username: 'beach_user' },
    likes: 890,
    location: { title: 'Maldives' },
    tags: [{ title: 'beach' }, { title: 'tropical' }, { title: 'ocean' }]
  },
  {
    id: 'demo3',
    alt_description: 'Ancient city architecture',
    urls: {
      small: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73aeb?w=400',
      regular: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73aeb?w=800',
      full: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73aeb?w=1200'
    },
    user: { name: 'City Explorer', username: 'city_user' },
    likes: 567,
    location: { title: 'Rome, Italy' },
    tags: [{ title: 'architecture' }, { title: 'city' }, { title: 'history' }]
  }
];

export const unsplashApi = {
  // Get random photos for destinations
  getRandomPhotos: async (query = 'travel destination', count = 12) => {
    try {
      console.log('Fetching photos with API key:', UNSPLASH_ACCESS_KEY ? 'Present' : 'Missing');
      
      const response = await fetch(
        `${UNSPLASH_API_URL}/photos/random?query=${encodeURIComponent(query)}&count=${count}&client_id=${UNSPLASH_ACCESS_KEY}`
      );
      
      if (!response.ok) {
        console.error('API Error:', response.status, response.statusText);
        const errorData = await response.json().catch(() => ({}));
        console.error('Error details:', errorData);
        
        // Return demo data if API fails
        console.log('Using demo data as fallback');
        return Array.from({ length: Math.min(count, 6) }, (_, i) => ({
          ...demoData[i % demoData.length],
          id: `demo${i + 1}`
        }));
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching random photos:', error);
      // Return demo data on network error
      return Array.from({ length: Math.min(count, 6) }, (_, i) => ({
        ...demoData[i % demoData.length],
        id: `demo${i + 1}`
      }));
    }
  },

  // Search for specific destination photos
  searchPhotos: async (query, page = 1, perPage = 12) => {
    try {
      const response = await fetch(
        `${UNSPLASH_API_URL}/search/photos?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}&client_id=${UNSPLASH_ACCESS_KEY}`
      );
      
      if (!response.ok) {
        console.error('Search API Error:', response.status, response.statusText);
        const errorData = await response.json().catch(() => ({}));
        console.error('Search error details:', errorData);
        
        // Return filtered demo data based on query
        const filteredData = demoData.filter(photo => 
          photo.alt_description.toLowerCase().includes(query.toLowerCase()) ||
          photo.tags.some(tag => tag.title.toLowerCase().includes(query.toLowerCase())) ||
          (photo.location?.title && photo.location.title.toLowerCase().includes(query.toLowerCase()))
        );
        
        return filteredData.length > 0 ? filteredData : demoData.slice(0, 3);
      }
      
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Error searching photos:', error);
      // Return demo data on network error
      return demoData.slice(0, 3);
    }
  },

  // Get a single photo by ID
  getPhoto: async (photoId) => {
    try {
      const response = await fetch(
        `${UNSPLASH_API_URL}/photos/${photoId}?client_id=${UNSPLASH_ACCESS_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch photo');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching photo:', error);
      return null;
    }
  },

  // Get hero image for landing page
  getHeroImage: async () => {
    try {
      const response = await fetch(
        `${UNSPLASH_API_URL}/photos/random?query=beautiful landscape travel destination&orientation=landscape&client_id=${UNSPLASH_ACCESS_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch hero image');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching hero image:', error);
      return null;
    }
  }
};

// Mock data for development when API key is not available
export const mockDestinations = [
  {
    id: '1',
    urls: {
      small: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      regular: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080',
      full: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2000'
    },
    alt_description: 'Mountain landscape',
    user: { name: 'John Photographer', username: 'johnphoto' },
    likes: 1250,
    location: { name: 'Swiss Alps, Switzerland' }
  },
  {
    id: '2',
    urls: {
      small: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400',
      regular: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1080',
      full: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=2000'
    },
    alt_description: 'Tropical beach',
    user: { name: 'Beach Explorer', username: 'beachexp' },
    likes: 2340,
    location: { name: 'Maldives' }
  },
  {
    id: '3',
    urls: {
      small: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400',
      regular: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1080',
      full: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=2000'
    },
    alt_description: 'City skyline at sunset',
    user: { name: 'City Walker', username: 'citywalker' },
    likes: 890,
    location: { name: 'New York City, USA' }
  }
];

export const mockHeroImage = {
  urls: {
    regular: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920',
    full: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2000'
  },
  alt_description: 'Beautiful mountain landscape',
  user: { name: 'Nature Photographer' }
};