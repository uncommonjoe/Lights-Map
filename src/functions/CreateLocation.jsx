import { doc, getFirestore, setDoc } from 'firebase/firestore';
import auth from '../config/firebase';

const apiCreateLocations = async (location) => {
	const db = getFirestore(auth);

	if (location) {
		try {
			setDoc(doc(db, 'listings', location.id), location);
		} catch (error) {
			console.error('Error adding document: ', error);
			throw error;
		}
	}
};

export default apiCreateLocations;
