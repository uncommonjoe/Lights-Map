import { StyleSheet } from 'react-native';

const form = StyleSheet.create({
	label: {
		fontSize: 16,
		color: '#454C57',
		marginTop: 10,
		marginBottom: 5,
		fontWeight: 'normal',
	},
	// Text input style
	textInput: {
		padding: 10,
		color: '#454C57',
		fontSize: 16,
		borderColor: '#7A8286',
		borderWidth: 1,
		backgroundColor: 'white',
		borderRadius: 5,
	},
	datePicker: {
		width: '100%',
	},
	container: {
		marginBottom: 15,
	},
	checkboxContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	checkbox: {
		marginRight: 10,
	},
	selectDropdown: {
		backgroundColor: 'transparent',
		borderColor: '#7A8286',
		borderWidth: 1,
		backgroundColor: 'white',
		borderRadius: 5,
		width: '100%',
	},
	selectDropdownText: {
		fontSize: 16,
	},
});

export default form;
