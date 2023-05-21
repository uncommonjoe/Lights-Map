import { StyleSheet } from 'react-native';

const button = StyleSheet.create({
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
	listButton: {
		backgroundColor: '#f0f0f0',
		width: '100%',
		borderRadius: 10,
		padding: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 10,
		title: {
			fontSize: 18,
			fontWeight: 'bold',
		},
		icon: {},
	},
	formButton: {
		padding: 10,
		color: '#454C57',
		fontSize: 16,
		borderColor: '#7A8286',
		borderWidth: 1,
		backgroundColor: 'white',
		borderRadius: 5,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	link: {
		color: '#3366CC',
		fontSize: 16,
		fontWeight: '500',
		textDecorationStyles: 'solid',
	},
});

export default button;
