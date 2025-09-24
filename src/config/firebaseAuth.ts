import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { app } from './firebase';

const auth = getAuth(app);

export const authReady = new Promise<void>((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log('Signed in anonymously to Firebase');
            unsubscribe();
            resolve();
        } else {
            signInAnonymously(auth)
                .then(() => {
                    console.log('Anonymous sign-in completed');
                })
                .catch(console.error);
        }
    });
});

export { auth };
