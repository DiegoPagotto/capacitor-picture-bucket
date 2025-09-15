import React from 'react';
import type { Photo } from '../usePhotoGallery';

interface PhotoGridProps {
    photos: Photo[];
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos }) => {
    if (photos.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                <svg
                    className="w-16 h-16 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                </svg>
                <h3 className="text-lg font-medium mb-1">No photos yet</h3>
                <p className="text-sm">Take your first photo to get started!</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
            {photos.map((photo, index) => (
                <div key={index} className="relative group">
                    <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200">
                        <img
                            src={photo.webPath}
                            alt={`Photo ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PhotoGrid;
