import {
	SET_DISTRICTS,
	SET_FEATURES,
	SET_LOCATIONS,
	SET_SELECTED_LOCATION,
} from './actions';

const initialState = {
	districtsList: [],
	featuresList: [],
	locationsList: [],
	selectedLocation: null,
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
		case SET_SELECTED_LOCATION:
			return {
				...state,
				selectedLocation: action.payload,
			};
		default:
			return state;
	}
};

export default appReducer;
