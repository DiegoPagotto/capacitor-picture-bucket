import { useState, useEffect } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';

interface Photo {
    filepath: string;
    webPath?: string;
}

export const usePhotoGallery = () => {
    const [photos, setPhotos] = useState<Photo[]>([]);

    const takePhoto = async () => {
        try {
            const photo = await Camera.getPhoto({
                resultType: CameraResultType.Uri,
                source: CameraSource.Camera,
                quality: 90,
            });

            const fileName = Date.now() + '.jpeg';
            const savedFile = await savePicture(photo, fileName);

            const newPhotos = [savedFile, ...photos];
            setPhotos(newPhotos);

            await Filesystem.writeFile({
                path: 'photos.json',
                data: JSON.stringify(newPhotos),
                directory: Directory.Data,
            });
        } catch (error) {
            console.error('Error taking photo:', error);
        }
    };

    const savePicture = async (
        photo: { webPath?: string },
        fileName: string
    ): Promise<Photo> => {
        const response = await fetch(photo.webPath!);
        const blob = await response.blob();
        const base64Data = (await convertBlobToBase64(blob)) as string;

        await Filesystem.writeFile({
            path: fileName,
            data: base64Data,
            directory: Directory.Data,
        });

        return {
            filepath: fileName,
            webPath: photo.webPath,
        };
    };

    const convertBlobToBase64 = (blob: Blob) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onerror = reject;
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.readAsDataURL(blob);
        });

    const loadSaved = async () => {
        try {
            const photoList = await Filesystem.readFile({
                path: 'photos.json',
                directory: Directory.Data,
            });

            const photosInStorage = JSON.parse(photoList.data as string) || [];

            for (const photo of photosInStorage) {
                const file = await Filesystem.readFile({
                    path: photo.filepath,
                    directory: Directory.Data,
                });
                photo.webPath = `data:image/jpeg;base64,${file.data}`;
            }

            setPhotos(photosInStorage);
        } catch {
            console.log('No previous photos found');
        }
    };

    const deletePhoto = async (photo: Photo, index: number) => {
        try {
            await Filesystem.deleteFile({
                path: photo.filepath,
                directory: Directory.Data,
            });

            const newPhotos = photos.filter((_, i) => i !== index);
            setPhotos(newPhotos);

            await Filesystem.writeFile({
                path: 'photos.json',
                data: JSON.stringify(newPhotos),
                directory: Directory.Data,
            });
        } catch (error) {
            console.error('Error deleting photo:', error);
        }
    };

    useEffect(() => {
        loadSaved();
    }, []);

    return {
        photos,
        takePhoto,
        deletePhoto,
    };
};
