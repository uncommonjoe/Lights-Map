import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, query } from 'firebase/firestore';
import auth from '../config/firebase';

const useGetRegions = () => {
	const [regionList, setRegionList] = useState({});
	const db = getFirestore(auth);

	useEffect(() => {
		fetchRegions();
	}, []);

	const fetchRegions = async () => {
		const regions = [];

		try {
			const q = query(collection(db, 'local_region'));
			const querySnapshot = await getDocs(q);

			querySnapshot.forEach((doc) => {
				regions.push(doc.data());
			});

			setRegionList(regions);
		} catch (error) {
			console.error('Error getting regions: ', error);
			throw error;
		}
	};

	return [regionList, fetchRegions];
};

export default useGetRegions;
