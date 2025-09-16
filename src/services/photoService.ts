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
import { storage, app } from '../config/firebase';
import type { Photo, PhotoData } from '../types/photo';

export class PhotoService {
    private firestore = getFirestore(app);

    async takePhoto(): Promise<{ webPath?: string }> {
        const photo = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 90,
        });
        return photo;
    }

    async savePhoto(
        photo: { webPath?: string },
        fileName: string
    ): Promise<Photo> {
        const response = await fetch(photo.webPath!);
        const blob = await response.blob();

        const storageRef = ref(storage, `photos/${fileName}`);
        console.log('Uploading to Storage:', fileName);
        await uploadBytes(storageRef, blob);
        console.log('Upload done:', storageRef.fullPath);

        const url = await getDownloadURL(storageRef);

        const docRef = await addDoc(collection(this.firestore, 'photos'), {
            filename: fileName,
            url,
            createdAt: Date.now(),
        });

        return {
            id: docRef.id,
            webPath: url,
            filename: fileName,
        };
    }

    async loadPhotos(): Promise<Photo[]> {
        console.log('Loading saved photos from Firestore...');
        const querySnapshot = await getDocs(
            collection(this.firestore, 'photos')
        );
        console.log('Number of photos in Firestore:', querySnapshot.size);

        const savedPhotos: Photo[] = [];
        querySnapshot.forEach((docSnap) => {
            const data = docSnap.data() as PhotoData;
            console.log('Photo from Firestore:', data);
            savedPhotos.push({
                id: docSnap.id,
                webPath: data.url,
                filename: data.filename,
            });
        });

        return savedPhotos.reverse();
    }

    async deletePhoto(photo: Photo): Promise<void> {
        if (photo.filename) {
            const storageRef = ref(storage, `photos/${photo.filename}`);
            await deleteObject(storageRef);
        }

        if (photo.id) {
            await deleteDoc(doc(this.firestore, 'photos', photo.id));
        }
    }

    generateFileName(): string {
        return Date.now() + '.jpeg';
    }
}
