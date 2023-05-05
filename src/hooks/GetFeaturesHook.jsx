import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, query } from 'firebase/firestore';
import auth from '../config/firebase';

export default function getFeaturesHook() {
	const [featureList, setFeatureList] = useState({});
	const db = getFirestore(auth);

	useEffect(() => {
		const fetchData = async () => {
			const fetchedRegions = await apiGetFeatureList();
			setFeatureList(fetchedRegions);
		};

		fetchData();
	}, []);

	// api call to get and return list of regions
	const apiGetFeatureList = async () => {
		const features = [];

		try {
			const q = query(collection(db, 'features'));
			const querySnapshot = await getDocs(q);

			querySnapshot.forEach((doc) => {
				features.push(doc.data());
			});

			setFeatureList(features);
			console.log(features);

			return features;
		} catch (e) {
			console.error('Error getting features: ', e);
			throw error;
		}
	};

	return [featureList, apiGetFeatureList];
}
