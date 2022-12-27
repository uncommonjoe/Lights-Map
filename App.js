import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import BottomTab from './src/components/BottomTabs';
import './src/config/firebase';

export default function App() {
	return (
		<NavigationContainer style={{ flex: 1 }}>
			<BottomTab />
		</NavigationContainer>
	);
}
