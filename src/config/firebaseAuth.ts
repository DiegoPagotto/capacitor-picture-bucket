import { getAuth, signInAnonymously } from 'firebase/auth';
import { app } from './firebase';

const auth = getAuth(app);
signInAnonymously(auth)
    .then(() => console.log('Signed in anonymously to Firebase'))
    .catch(console.error);

export { auth };
