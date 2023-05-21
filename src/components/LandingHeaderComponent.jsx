import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LandingHeader() {
	return (
		<View style={local.background}>
			<View style={local.container}>
				<Text style={local.title}>Billings</Text>
				<Text style={local.title}>Christmas Lights</Text>
				<Text style={[local.subTitle, { marginTop: 10 }]}>
					Find the best holiday lights in Billings!
				</Text>
			</View>
		</View>
	);
}

const local = StyleSheet.create({
	background: {
		backgroundColor: 'white',
		borderBottomWidth: 1,
		borderBottomColor: '#eee',
	},
	container: {
		alignItems: 'left',
		justifyContent: 'center',
		paddingTop: 20,
		paddingBottom: 40,
		paddingHorizontal: 15,
	},
	title: {
		fontSize: 32,
		fontWeight: 'bold',
		color: '#292B2C',
	},
	subTitle: {
		fontSize: 20,
		color: '#292B2C',
	},
});
