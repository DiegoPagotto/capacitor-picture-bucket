import { useState, useEffect, useMemo } from 'react';
import { PhotoService } from '../services/photoService';
import type { Photo } from '../types/photo';

export const usePhotoGallery = () => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const photoService = useMemo(() => new PhotoService(), []);

    const takePhoto = async () => {
        try {
            const photo = await photoService.takePhoto();
            const fileName = photoService.generateFileName();
            await photoService.savePhoto(photo, fileName);
        } catch (error) {
            console.error('Error taking photo:', error);
        }
    };

    const deletePhoto = async (photo: Photo) => {
        try {
            await photoService.deletePhoto(photo);
        } catch (error) {
            console.error('Error deleting photo:', error);
        }
    };

    useEffect(() => {
        const unsubscribe = photoService.subscribePhotos(setPhotos);
        return () => unsubscribe();
    }, [photoService]);

    return { photos, takePhoto, deletePhoto };
};
