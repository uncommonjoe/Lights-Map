import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, query } from 'firebase/firestore';
import auth from '../config/firebase';

const useGetFeatures = () => {
	const [featureList, setFeatureList] = useState({});
	const db = getFirestore(auth);

	useEffect(() => {
		fetchFeatures();
	}, []);

	const fetchFeatures = async () => {
		const features = [];

		try {
			const q = query(collection(db, 'features'));
			const querySnapshot = await getDocs(q);

			querySnapshot.forEach((doc) => {
				features.push(doc.data());
			});

			setFeatureList(features);
			console.log(features);
		} catch (error) {
			console.error('Error getting features: ', error);
			throw error;
		}
	};

	return [featureList, fetchFeatures];
};

export default useGetFeatures;
