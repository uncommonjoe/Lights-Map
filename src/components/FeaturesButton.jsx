import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import button from '../styles/button.style';
import { iconMap } from '../modules/IconMapModule';

export default function FeaturesButton(payload) {
	const [feature] = useState(payload.feature);
	const navigation = useNavigation();

	return (
		<TouchableOpacity
			style={[local.button]}
			onPress={() => navigation.navigate('ListPage')}
		>
			<View style={[local.iconContainer]}>
				<FontAwesomeIcon
					icon={iconMap[feature.iconName]}
					size={44}
					style={local.iconContainer.icon}
				/>
			</View>
			<Text style={[local.title]}>{feature.name}</Text>
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
		width: 80,
		height: 80,
		justifyContent: 'center',
		alignItems: 'center',
		icon: {
			color: '#292B2C',
		},
	},
	title: {
		fontSize: 16,
		marginTop: 10,
	},
});
