import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import BottomTab from './src/components/BottomTabs';

export default function App() {
	return (
		<NavigationContainer style={{ flex: 1 }}>
			<BottomTab />
		</NavigationContainer>
	);
}
