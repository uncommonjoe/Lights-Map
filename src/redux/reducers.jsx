import { SET_LIGHT_LIST, SET_FEATURES_LIST, SET_REGIONS_LIST } from './actions';

const initialState = {
	lightList: [],
	featureList: [],
	regionList: [],
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_LIGHT_LIST:
			return { ...state, lightList: action.payload };
		case SET_FEATURES_LIST:
			return { ...state, featureList: action.payload };
		case SET_REGIONS_LIST:
			return { ...state, regionList: action.payload };
		default:
			return state;
	}
};

export default rootReducer;
