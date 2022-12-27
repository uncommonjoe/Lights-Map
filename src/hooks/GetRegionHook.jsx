import React, { useState } from 'react';
import { getFirestore, collection, getDocs, query } from 'firebase/firestore';
import auth from '../config/firebase';

export default function getRegionHook(region) {
	const [localRegion, setLocalRegion] = useState({});
	const db = getFirestore(auth);

	console.warn('here ', region);

	// api call to get and return list

	const apiGetRegionList = async () => {
		const local_regions = [];

		try {
			const q = query(collection(db, 'local_regions'));
			const querySnapshot = await getDocs(q);

			querySnapshot.forEach((doc) => {
				local_regions.push(doc.data());
			});

			//setLocalRegion(local_regions);
			console.warn(local_regions);

			return local_regions;
		} catch (e) {
			console.error('Error getting local regions: ', e);
			throw error;
		}
	};

	return [localRegion, apiGetRegionList];
}
