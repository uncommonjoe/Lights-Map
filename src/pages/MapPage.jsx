import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LightsOne from '../img/icons/LightsOne';

export default function MapPage() {
	return (
		<View style={styles.container}>
			<StatusBar style='auto' />

			<Text>Map</Text>
			<LightsOne />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
