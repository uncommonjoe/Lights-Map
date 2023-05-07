export const SET_DISTRICTS = 'SET_DISTRICTS';
export const SET_FEATURES = 'SET_FEATURES';
export const SET_LOCATIONS = 'SET_LOCATIONS';

export const setDistricts = (districts) => ({
	type: SET_DISTRICTS,
	payload: districts,
});

export const setFeatures = (features) => ({
	type: SET_FEATURES,
	payload: features,
});

export const setLocations = (locations) => ({
	type: SET_LOCATIONS,
	payload: locations,
});
