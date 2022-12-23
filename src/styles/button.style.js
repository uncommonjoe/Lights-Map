import { StyleSheet } from 'react-native';

export default button = StyleSheet.create({
	button: {
		minHeight: 60,
		flex: 1,
		textAlign: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 10,
		container: {
			flexDirection: 'row',
		},
		icon: {},
		text: {
			color: 'white',
			fontWeight: 'bold',
			fontSize: 16,
		},
	},
	green: {
		backgroundColor: '#3F8014',
	},
	red: {
		backgroundColor: '#931D1D',
	},
});
