import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { auth } from '../config/firebase';

const apiStoreImage = async (imageObj) => {
	const db = getFirestore(auth);

	const storage = getStorage();

	console.log('StoreImage.jsx imageObj', imageObj);

	const response = await fetch(imageObj.uri);
	const imageBlob = await response.blob();

	const storageRef = ref(storage, 'images/' + imageObj.fileName);
	await uploadBytes(storageRef, imageBlob);

	const imageUrl = await getDownloadURL(storageRef);
	console.log('the image URL:', imageUrl);

	return imageUrl;
};

export default apiStoreImage;
