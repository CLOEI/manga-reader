// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
	GithubAuthProvider,
	getAuth,
	signInWithPopup,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth';
import {
	getFirestore,
	setDoc,
	collection,
	doc,
	getDoc,
} from 'firebase/firestore';
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
const githubProvider = new GithubAuthProvider();

const auth = getAuth(app);
const db = getFirestore(app);

const usersRef = collection(db, 'users');

export {
	auth,
	db,
	usersRef,
	githubProvider,
	signInWithPopup,
	signOut,
	onAuthStateChanged,
	setDoc,
	collection,
	doc,
	getDoc,
};
