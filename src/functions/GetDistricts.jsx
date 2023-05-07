import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, query } from 'firebase/firestore';
import auth from '../config/firebase';

const apiGetDistricts = async () => {
	const db = getFirestore(auth);
	const districts = [];

	try {
		const q = query(collection(db, 'local_region'));
		const querySnapshot = await getDocs(q);

		querySnapshot.forEach((doc) => {
			districts.push(doc.data());
		});

		return districts;
	} catch (error) {
		console.error('Error getting districts: ', error);
		throw error;
	}
};

export default apiGetDistricts;
