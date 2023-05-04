import React, { useState } from 'react';
import { getFirestore, collection, getDocs, query } from 'firebase/firestore';
import auth from '../config/firebase';

import convertRegionHook from './GetRegionHook';

export default function getLightList() {
	const [lightList, setLightList] = useState({});
	const [regionList, apiGetRegionList] = convertRegionHook();
	const db = getFirestore(auth);

	// api call to get and return list

	const findAssociatedLocalRegion = (area, localRegions) => {
		console.log('area', area);
		console.log('localRegions', localRegions);
		const localRegion = localRegions.find((region) => region.id === area);
		return localRegion ? localRegion.name : null;
	};

	const apiGetList = async () => {
		const listings = [];

		try {
			const localRegions = await apiGetRegionList();

			const q = query(collection(db, 'listings'));
			const querySnapshot = await getDocs(q);

			querySnapshot.forEach((doc) => {
				const listingData = doc.data();
				const localRegionName = findAssociatedLocalRegion(
					listingData.area,
					localRegions
				);
				listings.push({ ...listingData, localRegionName });
			});

			console.log('-- listings --');
			console.log(listings);

			setLightList(listings);
			return listings;
		} catch (e) {
			console.error('Error getting listings: ', e);
			throw e;
		}
	};

	return [lightList, apiGetList];
}
