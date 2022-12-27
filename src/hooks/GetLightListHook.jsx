import React, { useState } from 'react';
import { getFirestore, collection, getDocs, query } from 'firebase/firestore';
import auth from '../config/firebase';

export default function getLightList() {
	const [lightList, setLightList] = useState({});
	const db = getFirestore(auth);

	// api call to get and return list

	const apiGetList = async () => {
		const listings = [];

		try {
			const q = query(collection(db, 'listings'));
			const querySnapshot = await getDocs(q);

			querySnapshot.forEach((doc) => {
				listings.push(doc.data());
			});

			setLightList(listings);
			//console.warn(listings);

			return listings;
		} catch (e) {
			console.error('Error getting listings: ', e);
			throw error;
		}
	};

	return [lightList, apiGetList];
}
