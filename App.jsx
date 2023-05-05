import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import BottomTab from './src/components/BottomTabs';
import './src/config/firebase';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store from './src/redux/store';

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer style={{ flex: 1 }}>
				<BottomTab />
			</NavigationContainer>
		</Provider>
	);
}
