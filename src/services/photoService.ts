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
    doc,
    deleteDoc,
    query,
    onSnapshot,
    orderBy,
} from 'firebase/firestore';
import { storage, app } from '../config/firebase';
import type { Photo, PhotoData } from '../types/photo';

export class PhotoService {
    private firestore = getFirestore(app);

    subscribePhotos(callback: (photos: Photo[]) => void) {
        console.log('Subscribing to photos in Firestore...');
        const q = query(
            collection(this.firestore, 'photos'),
            orderBy('createdAt', 'desc')
        );
        return onSnapshot(q, (snapshot) => {
            const savedPhotos: Photo[] = snapshot.docs.map((docSnap) => {
                const data = docSnap.data() as PhotoData;
                return {
                    id: docSnap.id,
                    webPath: data.url,
                    filename: data.filename,
                };
            });
            callback(savedPhotos);
        });
    }

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
