import { useState, useEffect, useCallback, useMemo } from 'react';
import { PhotoService } from '../services/photoService';
import type { Photo } from '../types/photo';

export const usePhotoGallery = () => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const photoService = useMemo(() => new PhotoService(), []);

    const takePhoto = async () => {
        try {
            const photo = await photoService.takePhoto();
            const fileName = photoService.generateFileName();
            const savedFile = await photoService.savePhoto(photo, fileName);

            setPhotos((prev) => [savedFile, ...prev]);
        } catch (error) {
            console.error('Error taking photo:', error);
        }
    };

    const loadSaved = useCallback(async () => {
        try {
            const savedPhotos = await photoService.loadPhotos();

            setPhotos((prev) => {
                const prevIds = prev.map((p) => p.id).join(',');
                const newIds = savedPhotos.map((p) => p.id).join(',');
                console.log('Previous IDs:', prevIds);
                console.log('New IDs:', newIds);
                if (prevIds !== newIds) {
                    console.log('Updating photos state');
                    return savedPhotos;
                }
                console.log('No changes detected, skipping state update');
                return prev;
            });
        } catch (error) {
            console.error('Error loading photos:', error);
        }
    }, [photoService]);

    const deletePhoto = async (photo: Photo) => {
        try {
            await photoService.deletePhoto(photo);
            setPhotos((prev) => prev.filter((p) => p.id !== photo.id));
        } catch (error) {
            console.error('Error deleting photo:', error);
        }
    };

    useEffect(() => {
        console.log('Initializing photo polling...');
        loadSaved();

        const interval = setInterval(() => {
            console.log('Polling for new photos...');
            loadSaved();
        }, 10000);

        return () => clearInterval(interval);
    }, [loadSaved]);

    return {
        photos,
        takePhoto,
        deletePhoto,
    };
};
