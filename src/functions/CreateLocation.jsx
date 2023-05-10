import { doc, getFirestore, setDoc } from 'firebase/firestore';
import auth from '../config/firebase';

const apiCreateLocations = async (location) => {
	const db = getFirestore(auth);

	if (location) {
		try {
			// TODO: replace 4
			setDoc(doc(db, 'listings', '4'), location);
		} catch (error) {
			console.error('Error adding document: ', error);
			throw error;
		}
	}
};

export default apiCreateLocations;
