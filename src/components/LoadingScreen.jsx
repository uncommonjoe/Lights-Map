import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	View,
	SafeAreaView,
	Text,
	ActivityIndicator,
} from 'react-native';
import text from '../styles/text.style';
import { LinearGradient } from 'expo-linear-gradient';
import { version } from '../../package.json';

const LoadingScreen = ({ status }) => {
	const [statusMessage, setStatusMessage] = useState(status.status);

	useEffect(() => {
		setStatusMessage(status);
	}, [status]);

	return (
		<LinearGradient
			colors={['#3F8014', '#122E04']}
			start={[1, 0]}
			end={[0, 1]}
			style={local.background}
		>
			<SafeAreaView>
				<ActivityIndicator size='large' color='#fff' />

				<Text
					style={[
						text.textLight,
						{
							fontSize: 30,
							marginVertical: 20,
							textAlign: 'center',
						},
					]}
				>
					Billings Holiday Map
				</Text>

				<Text style={[text.textLight, { textAlign: 'center' }]}>
					Brought to you by
				</Text>
				<Text style={[text.textLight, { textAlign: 'center' }]}>
					UncommonJoe.com
				</Text>

				<Text style={local.version}>{statusMessage}</Text>
				<Text style={local.version}>v{version}</Text>
			</SafeAreaView>
		</LinearGradient>
	);
};

const local = StyleSheet.create({
	background: {
		backgroundColor: '#292B2C',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
	},
	version: {
		color: 'rgba(255, 255, 255, 0.5)',
		textAlign: 'center',
		position: 'relative',
		bottom: -200,
		left: 0,
		right: 0,
	},
});

export default LoadingScreen;
