import { useState, useEffect, useMemo } from 'react';
import { PhotoService } from '../services/photoService';
import { authReady } from '../config/firebaseAuth';
import type { Photo } from '../types/photo';

export const usePhotoGallery = () => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
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
        let unsubscribe: (() => void) | undefined;

        const initializePhotos = async () => {
            try {
                await authReady;
                console.log('Auth ready, subscribing to photos...');

                unsubscribe = photoService.subscribePhotos(setPhotos);
                setIsLoading(false);
            } catch (error) {
                console.error('Error initializing photos:', error);
                setIsLoading(false);
            }
        };

        initializePhotos();

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [photoService]);

    return { photos, takePhoto, deletePhoto, photoService, isLoading };
};
