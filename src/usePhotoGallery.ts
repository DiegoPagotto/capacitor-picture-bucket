import { useState, useEffect } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
} from 'firebase/storage';
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    doc,
    deleteDoc,
} from 'firebase/firestore';
import { storage, app } from './firebase';

export interface Photo {
    id?: string;
    webPath: string;
    filename?: string;
}

export const usePhotoGallery = () => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const firestore = getFirestore(app);

    const takePhoto = async () => {
        try {
            const photo = await Camera.getPhoto({
                resultType: CameraResultType.Uri,
                source: CameraSource.Camera,
                quality: 90,
            });

            const fileName = Date.now() + '.jpeg';
            const savedFile = await savePicture(photo, fileName);

            setPhotos((prev) => [savedFile, ...prev]);
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

        const storageRef = ref(storage, `photos/${fileName}`);
        console.log('Uploading to Storage:', fileName);
        await uploadBytes(storageRef, blob);
        console.log('Upload done:', storageRef.fullPath);

        const url = await getDownloadURL(storageRef);

        const docRef = await addDoc(collection(firestore, 'photos'), {
            filename: fileName,
            url,
            createdAt: Date.now(),
        });

        return {
            id: docRef.id,
            webPath: url,
            filename: fileName,
        };
    };

    const loadSaved = async () => {
        try {
            console.log('Loading saved photos from Firestore...');
            const querySnapshot = await getDocs(
                collection(firestore, 'photos')
            );
            const savedPhotos: Photo[] = [];
            console.log('Photos found:', querySnapshot.size);
            querySnapshot.forEach((docSnap) => {
                const data = docSnap.data();
                savedPhotos.push({
                    id: docSnap.id,
                    webPath: data.url,
                    filename: data.filename,
                });
            });

            const reversed = savedPhotos.reverse();
            setPhotos((prev) => {
                const prevIds = prev.map((p) => p.id).join(',');
                const newIds = reversed.map((p) => p.id).join(',');
                if (prevIds !== newIds) return reversed;
                return prev;
            });
        } catch (error) {
            console.error('Error loading photos:', error);
        }
    };

    const deletePhoto = async (photo: Photo) => {
        try {
            if (photo.filename) {
                const storageRef = ref(storage, `photos/${photo.filename}`);
                await deleteObject(storageRef);
            }

            if (photo.id) {
                await deleteDoc(doc(firestore, 'photos', photo.id));
            }

            setPhotos((prev) => prev.filter((p) => p.id !== photo.id));
        } catch (error) {
            console.error('Error deleting photo:', error);
        }
    };

    useEffect(() => {
        loadSaved();

        const interval = setInterval(() => {
            loadSaved();
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    return {
        photos,
        takePhoto,
        deletePhoto,
    };
};
