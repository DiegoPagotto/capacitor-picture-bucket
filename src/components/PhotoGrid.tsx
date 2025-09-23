import React, { useState } from 'react';
import type { Photo } from '../types/photo';
import PhotoItem from './PhotoItem';
import { PhotoService } from '../services/photoService';

interface PhotoGridProps {
    photos: Photo[];
    photoService?: PhotoService;
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos, photoService }) => {
    const [holdingPhotoIndex, setHoldingPhotoIndex] = useState<number | null>(
        null
    );

    const handleClickOutside = (event: React.MouseEvent) => {
        const target = event.target as HTMLElement;
        const isPhotoClick =
            target.tagName === 'IMG' ||
            target.closest('[data-photo-item]') !== null ||
            target.closest('button') !== null;

        if (!isPhotoClick && holdingPhotoIndex !== null) {
            setHoldingPhotoIndex(null);
        }
    };



    const handleDeletePhoto = async (photo: Photo) => {
        try {
            if (photoService) {
                await photoService.deletePhoto(photo);
            }
        } catch (error) {
            console.error('Failed to delete photo:', error);
        }
    };

    if (photos.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-32 px-4">
                <div className="text-center relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl scale-150"></div>

                    <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-sm">
                        <h3 className="text-xl font-semibold text-white mb-2">
                            No photos yet
                        </h3>
                        <p className="text-gray-400 text-sm max-w-xs">
                            Tap the camera button above to start capturing your
                            memories
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto" onClick={handleClickOutside}>
            <div className="text-center">
                <p className="text-gray-300 text-sm font-medium">
                    {photos.length} {photos.length === 1 ? 'photo' : 'photos'}{' '}
                    in your collection
                </p>
            </div>

            <div
                className="columns-2 sm:columns-3 md:columns-4 lg:columns-5"
                style={{ columnGap: 0 }}
            >
                {photos.map((photo, index) => (
                    <PhotoItem
                        key={index}
                        photo={photo}
                        index={index}
                        onDelete={handleDeletePhoto}
                        isHolding={holdingPhotoIndex === index}
                        onSetHolding={(isHolding) =>
                            setHoldingPhotoIndex(isHolding ? index : null)
                        }
                    />
                ))}
            </div>
        </div>
    );
};

export default PhotoGrid;
