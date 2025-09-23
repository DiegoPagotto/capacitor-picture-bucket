import React from 'react';
import type { Photo } from '../types/photo';

interface PhotoItemProps {
    photo: Photo;
    index: number;
}

const PhotoItem: React.FC<PhotoItemProps> = ({ photo, index }) => {
    return (
        <div className="break-inside-avoid" style={{ padding: 6 }}>
            <img
                src={photo.webPath}
                alt={`Photo ${index + 1}`}
                className="w-full h-auto object-cover rounded-lg block"
                loading="lazy"
            />
        </div>
    );
};

export default PhotoItem;
