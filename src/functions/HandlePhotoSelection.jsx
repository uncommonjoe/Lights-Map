import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';

const photoSelection = async () => {
	// Select photo from library
	const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

	if (status !== 'granted') {
		console.warn('Permission denied');
	} else {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: false,
			quality: 0.1,
		});

		if (!result.canceled) {
			const image = await manipulateAsync(result.assets[0].uri, [
				{
					resize: {
						width: 350,
					},
				},
			]);
			return image;
		}
	}
};

export default photoSelection;
