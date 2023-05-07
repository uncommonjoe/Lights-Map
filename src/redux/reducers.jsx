import { SET_DISTRICTS, SET_FEATURES, SET_LOCATIONS } from './actions';

const initialState = {
	districtsList: [],
	featuresList: [],
	locationsList: [],
};

const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_DISTRICTS:
			return {
				...state,
				districtsList: action.payload,
			};
		case SET_FEATURES:
			return {
				...state,
				featuresList: action.payload,
			};
		case SET_LOCATIONS:
			return {
				...state,
				locationsList: action.payload,
			};
		default:
			return state;
	}
};

export default appReducer;
