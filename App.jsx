import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import BottomTab from './src/components/BottomTabs';
import './src/config/firebase';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './src/redux/store/configureStore';

export default function App() {
	const store = configureStore();

	return (
		<Provider store={store}>
			{/* <PersistGate persistor={persistor} loading={null}> */}
			<NavigationContainer style={{ flex: 1 }}>
				<BottomTab />
			</NavigationContainer>
			{/* </PersistGate> */}
		</Provider>
	);
}
