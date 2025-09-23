import React, { useRef } from 'react';
import type { Photo } from '../types/photo';

interface PhotoItemProps {
    photo: Photo;
    index: number;
    onDelete?: (photo: Photo) => void;
    isHolding: boolean;
    onSetHolding: (isHolding: boolean) => void;
}

const PhotoItem: React.FC<PhotoItemProps> = ({
    photo,
    index,
    onDelete,
    isHolding,
    onSetHolding,
}) => {
    const holdTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleStart = () => {
        holdTimeoutRef.current = setTimeout(() => {
            onSetHolding(true);
        }, 300);
    };

    const handleEnd = () => {
        if (holdTimeoutRef.current) {
            clearTimeout(holdTimeoutRef.current);
            holdTimeoutRef.current = null;
        }
    };

    const handleClickOutside = () => {
        onSetHolding(false);
    };



    const handleDelete = async () => {
        if (onDelete) {
            await onDelete(photo);
        }
        onSetHolding(false);
    };

    return (
        <div className="break-inside-avoid relative" style={{ padding: 6 }}>
            <div
                className="relative"
                data-photo-item="true"
                onMouseDown={handleStart}
                onMouseUp={handleEnd}
                onMouseLeave={handleEnd}
                onTouchStart={handleStart}
                onTouchEnd={handleEnd}
                onTouchCancel={handleEnd}
            >
                <img
                    src={photo.webPath}
                    alt={`Photo ${index + 1}`}
                    className={`w-full h-auto object-cover rounded-lg block transition-all duration-300 ${
                        isHolding ? 'blur-sm' : ''
                    }`}
                    loading="lazy"
                />

                {isHolding && (
                    <>
                        <div
                            className="absolute inset-0 bg-black/20 rounded-lg"
                            onClick={handleClickOutside}
                        />

                        <div className="absolute inset-6 flex flex-col items-center justify-center gap-4">
                            <button
                                onClick={handleDelete}
                                className="bg-red-600 hover:bg-red-700 text-white p-5 rounded-full shadow-lg transition-colors duration-200 flex items-center justify-center"
                                title="Delete photo"
                                style={{ padding: 16 }}
                            >
                                <svg
                                    className="w-8 h-8"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                </svg>
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default PhotoItem;
