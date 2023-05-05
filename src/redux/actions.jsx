export const SET_LIGHT_LIST = 'SET_LIGHT_LIST';

export const setLightList = (lightList) => {
	return {
		type: SET_LIGHT_LIST,
		payload: lightList,
	};
};
