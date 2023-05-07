import { getFirestore, collection, getDocs, query } from 'firebase/firestore';
import auth from '../config/firebase';

const apiGetFeatures = async () => {
	const db = getFirestore(auth);
	const features = [];

	try {
		const q = query(collection(db, 'features'));
		const querySnapshot = await getDocs(q);

		querySnapshot.forEach((doc) => {
			features.push(doc.data());
		});

		return features;
	} catch (error) {
		console.error('Error getting features: ', error);
		throw error;
	}
};

export default apiGetFeatures;
