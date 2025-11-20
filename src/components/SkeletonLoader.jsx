import React from 'react';

const SkeletonLoader = ({ type = 'gallery' }) => {
  if (type === 'hero') {
    return (
      <div className="relative h-screen w-full">
        <div className="skeleton absolute inset-0" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="skeleton h-12 w-96 mx-auto rounded-lg" />
            <div className="skeleton h-6 w-64 mx-auto rounded-lg" />
            <div className="skeleton h-12 w-80 mx-auto rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (type === 'gallery') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(12)].map((_, index) => (
          <div key={index} className="group">
            <div className="skeleton aspect-[4/5] rounded-xl" />
            <div className="mt-3 space-y-2">
              <div className="skeleton h-4 w-3/4 rounded" />
              <div className="skeleton h-3 w-1/2 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default SkeletonLoader;