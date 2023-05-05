import { SET_LIGHT_LIST } from './actions';

const initialState = {
	lightList: [],
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_LIGHT_LIST:
			return { ...state, lightList: action.payload };
		default:
			return state;
	}
};

export default rootReducer;
