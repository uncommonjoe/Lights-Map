export const SET_LIGHT_LIST = 'SET_LIGHT_LIST';
export const SET_FEATURES_LIST = 'SET_FEATURES_LIST';
export const SET_DISTRICTS_LIST = 'SET_DISTRICTS_LIST';

export const setLightList = (lightList) => {
	return {
		type: SET_LIGHT_LIST,
		payload: lightList,
	};
};

export const featuresList = (featureList) => {
	return {
		type: SET_FEATURES_LIST,
		payload: featureList,
	};
};

export const districtList = (districtList) => {
	return {
		type: SET_DISTRICTS_LIST,
		payload: districtList,
	};
};
