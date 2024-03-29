import { getFirestore } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { auth } from '../config/firebase';

const apiStoreImage = async (imageObj, name) => {
	const db = getFirestore(auth);
	const storage = getStorage();

	// take name, remove spaces and make all lowercase to use as file name
	const imageName = name.replace(/\s/g, '');

	// get image uri and make it into a blob
	const response = await fetch(imageObj.uri);
	const imageBlob = await response.blob();

	// set path to image and upload to storage
	const storageRef = ref(storage, 'images/' + imageName);
	const uploadTask = uploadBytes(storageRef, imageBlob);

	// Wait for the upload task to complete
	await uploadTask;

	// get image URL from storage
	const downloadUrl = await getDownloadURL(storageRef);

	return downloadUrl;
};

export default apiStoreImage;
