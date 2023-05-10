import { useEffect, useState } from 'react';
import { doc, getFirestore, setDoc, query } from 'firebase/firestore';
import auth from '../config/firebase';

const apiCreateLocations = async (location) => {
	const db = getFirestore(auth);

	if (location) {
		try {
			setDoc(doc(db, 'listings', '4'), location);
		} catch (error) {
			console.error('Error adding document: ', error);
			throw error;
		}
	}
};

export default apiCreateLocations;
