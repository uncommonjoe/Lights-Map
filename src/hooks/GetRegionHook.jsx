import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, query } from 'firebase/firestore';
import auth from '../config/firebase';

export default function getRegionHook() {
	const [localRegion, setLocalRegion] = useState({});
	const db = getFirestore(auth);

	useEffect(() => {
		const fetchData = async () => {
			const fetchedRegions = await apiGetRegionList();
			setLocalRegion(fetchedRegions);
		};

		fetchData();
	}, []);

	// api call to get and return list of regions
	const apiGetRegionList = async () => {
		const regions = [];

		try {
			const q = query(collection(db, 'local_region'));
			const querySnapshot = await getDocs(q);

			querySnapshot.forEach((doc) => {
				regions.push(doc.data());
			});

			setLocalRegion(regions);

			return regions;
		} catch (e) {
			console.error('Error getting regions: ', e);
			throw error;
		}
	};

	return [localRegion, apiGetRegionList];
}
