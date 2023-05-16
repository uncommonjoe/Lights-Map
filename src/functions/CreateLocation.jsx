import { doc, getFirestore, setDoc } from 'firebase/firestore';
import auth from '../config/firebase';

const apiCreateLocations = async (location) => {
	const db = getFirestore(auth);

	const id = Math.floor(Date.now() * Math.random()).toString();

	if (location) {
		try {
			setDoc(doc(db, 'listings', id), location);
		} catch (error) {
			console.error('Error adding document: ', error);
			throw error;
		}
	}
};

export default apiCreateLocations;
