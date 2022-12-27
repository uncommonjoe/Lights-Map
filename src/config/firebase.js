// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
//import { getAnalytics } from 'firebase/analytics';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import {
	FIREBASE_API_KEY,
	FIREBASE_AUTH_DOMAIN,
	FIREBASE_PROJECT_ID,
	FIREBASE_STORAGE_BUCKET,
	FIREBASE_APP_ID,
	FIREBASE_MEASUREMENT_ID,
} from '@env';

// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
	apiKey: FIREBASE_API_KEY,
	authDomain: FIREBASE_AUTH_DOMAIN,
	projectId: FIREBASE_PROJECT_ID,
	storageBucket: FIREBASE_STORAGE_BUCKET,
	messagingSenderId: FIREBASE_APP_ID,
	appId: FIREBASE_APP_ID,
	measurementId: FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const auth = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export default auth;
