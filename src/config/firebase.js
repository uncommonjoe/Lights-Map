// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
//import { getAnalytics } from 'firebase/analytics';

import {
	FIREBASE_API_KEY,
	FIREBASE_AUTH_DOMAIN,
	FIREBASE_PROJECT_ID,
	FIREBASE_STORAGE_BUCKET,
	FIREBASE_APP_ID,
	FIREBASE_MEASUREMENT_ID,
} from '@env';

if (
	!FIREBASE_API_KEY ||
	!FIREBASE_AUTH_DOMAIN ||
	!FIREBASE_PROJECT_ID ||
	!FIREBASE_STORAGE_BUCKET ||
	!FIREBASE_APP_ID ||
	!FIREBASE_MEASUREMENT_ID
) {
	console.error('Missing firebase env variables');
}

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
