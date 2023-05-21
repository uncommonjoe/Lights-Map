import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import button from '../styles/button.style';
import { iconMap } from '../modules/IconMapModule';

export default function DistrictsButton(payload) {
	const [district] = useState(payload.district);
	const navigation = useNavigation();

	return (
		<TouchableOpacity
			style={[local.button]}
			onPress={() => navigation.navigate('ListPage')}
		>
			<View style={[local.iconContainer]}>
				<Text style={[local.title]}>{district.name}</Text>
			</View>
		</TouchableOpacity>
	);
}

const local = StyleSheet.create({
	button: {
		width: 100,
		alignItems: 'center',
	},
	iconContainer: {
		borderColor: '#292B2C',
		borderWidth: 2,
		backgroundColor: 'white',
		borderRadius: 30,
		width: 100,
		height: 80,
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontSize: 16,
	},
});
