import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import LoadingScreen from './src/components/LoadingScreen';
import Navigation from './src/components/NavigationComponent';
import apiGetFeatures from './src/functions/GetFeatures';
import apiGetDistricts from './src/functions/GetDistricts';
import apiGetLocations from './src/functions/GetLocations';
import './src/config/firebase';
import { Provider } from 'react-redux';
import { setDistricts, setFeatures, setLocations } from './src/redux/actions';
import store from './src/redux/store';

const App = () => {
	const [isLoading, setLoading] = useState(true);
	const [statusMessage, setStatusMessage] = useState('Initializing');

	useEffect(() => {
		fetchDataAndStore();
	}, []);

	const apiCalls = async () => {
		// Get list of features
		setStatusMessage('Getting light features');
		const features = await apiGetFeatures();
		store.dispatch(setFeatures(features));

		// Get list of districts
		setStatusMessage('Looking through areas of town');
		const districts = await apiGetDistricts();
		store.dispatch(setDistricts(districts));

		// Get list of locations
		setStatusMessage('Finding amazing lights');
		const locations = await apiGetLocations(districts, features);
		store.dispatch(setLocations(locations));
	};

	const fetchDataAndStore = async () => {
		await apiCalls();

		// Then set loading to false
		setLoading(false);
	};

	return (
		<Provider store={store}>
			<NavigationContainer style={{ flex: 1 }}>
				<StatusBar style='dark' />

				{/* when app loads, display loading screen and get list, features and districts */}
				{isLoading ? (
					<LoadingScreen status={statusMessage} />
				) : (
					<Navigation />
				)}
			</NavigationContainer>
		</Provider>
	);
};

export default App;
