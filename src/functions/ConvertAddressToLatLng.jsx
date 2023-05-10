import Geocode from 'react-geocode';
import { GOOGLE_MAPS_API_KEY } from '@env';

Geocode.setApiKey(GOOGLE_MAPS_API_KEY);

const convertAddressToLatLng = (addressObj) => {
	const address =
		addressObj.address1 +
		' ' +
		addressObj.city +
		', ' +
		addressObj.state +
		' ' +
		addressObj.zip;

	return new Promise((resolve, reject) => {
		Geocode.fromAddress(address).then(
			(response) => {
				const { lat, lng } = response.results[0].geometry.location;
				resolve({ lat: lat, lng: lng });
			},
			(error) => {
				console.error(error);
				reject(error);
			}
		);
	});
};

export default convertAddressToLatLng;
