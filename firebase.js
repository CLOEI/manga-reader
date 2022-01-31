// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	signOut,
	onAuthStateChanged,
	User,
} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyA-VbCo37vtwrXePeotO0CKWPgpxK2iCXM',
	authDomain: 'manga-reader-a4b61.firebaseapp.com',
	projectId: 'manga-reader-a4b61',
	storageBucket: 'manga-reader-a4b61.appspot.com',
	messagingSenderId: '974531704528',
	appId: '1:974531704528:web:96792695dc6776b0c750d5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export {
	auth,
	googleProvider,
	signInWithPopup,
	signOut,
	onAuthStateChanged,
	User,
};
