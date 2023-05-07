import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import LoadingScreen from './src/components/LoadingScreen';
import BottomTab from './src/components/BottomTabs';
import useGetFeatures from './src/hooks/GetFeaturesHook';
import './src/config/firebase';
import { Provider } from 'react-redux';
import store from './src/redux/store';

const App = () => {
	const [isLoading, setLoading] = useState(true);
	const [statusMessage, setStatusMessage] = useState('Initializing');
	const [featuresList, setFeaturesList] = useState({});
	const [regionsList, setRegionsList] = useState({});
	const [locationsList, setLocationsList] = useState({});
	const [featureList, fetchFeatures] = useGetFeatures();

	const apiCalls = async () => {
		// Get list of features and store to redux
		setStatusMessage('Getting light features');
		const features = await fetchFeatures();
		setFeaturesList(features);

		// Get list of regions and store to redux
		setStatusMessage('Looking through areas of town');
		// const regions = await GetRegions();
		// setRegionsList(regions);

		// // Get list of locations and store to redux
		setStatusMessage('Finding amazing lights');
		// const locations = await GetLocations();
		// setLocationsList(locations);

		console.log('*************************');
		console.log('Features ', featuresList);
		// console.log('Regions ', regionsList);
		// console.log('Locations ', locationsList);
		// Then set loading to false
		setLoading(false);
	};

	useEffect(() => {
		apiCalls();
	}, []);

	return (
		<Provider store={store}>
			<NavigationContainer style={{ flex: 1 }}>
				<StatusBar style='auto' />

				{/* when app loads, display loading screen and get list, features and regions */}
				{isLoading ? (
					<LoadingScreen status={statusMessage} />
				) : (
					<BottomTab />
				)}
			</NavigationContainer>
		</Provider>
	);
};

export default App;
