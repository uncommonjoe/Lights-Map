export const SET_LIGHT_LIST = 'SET_LIGHT_LIST';
export const SET_FEATURES_LIST = 'SET_FEATURES_LIST';
export const SET_REGIONS_LIST = 'SET_REGIONS_LIST';

export const setLightList = (lightList) => {
	return {
		type: SET_LIGHT_LIST,
		payload: lightList,
	};
};

export const featuresList = (featureList) => {
	return {
		type: SET_REGIONS_LIST,
		payload: featureList,
	};
};

export const regionsList = (regionList) => {
	return {
		type: SET_REGIONS_LIST,
		payload: regionList,
	};
};
