import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	ActivityIndicator,
} from 'react-native';
import page from '../styles/page.style';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { iconMap } from '../modules/IconMapModule';
import LocationComponent from '../components/LocationComponent';

const MapPage = ({ locationsList }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [selectedMarker, setSelectedMarker] = useState(null);

	const handleMarkerPress = async (marker) => {
		// Clears out old selectedMarker and sets the new marker that was pressed
		await setSelectedMarker(null);
		setSelectedMarker(marker);

		if (selectedMarker && selectedMarker.id === marker.id) {
			setSelectedMarker(null);
		}
	};

	const handleMapPress = (event) => {
		// Check if the map was clicked, and not clicked on a marker
		if (event.nativeEvent && !event.nativeEvent.selectedMarker) {
			setSelectedMarker(null);
		}
	};

	return (
		<SafeAreaView style={[page.container, local.container]}>
			<StatusBar style='auto' />

			{isLoading ? (
				<ActivityIndicator />
			) : (
				<MapView
					style={local.map}
					initialRegion={{
						latitude: 45.7833,
						longitude: -108.5007,
						latitudeDelta: 0.2,
						longitudeDelta: 0.2,
					}}
					onPress={handleMapPress}
				>
					{locationsList.map((marker, index) => (
						<Marker
							key={index}
							coordinate={{
								latitude: marker.geo_location.latitude,
								longitude: marker.geo_location.longitude,
							}}
							title={marker.name}
							anchor={[0, 0]}
							onPress={() => handleMarkerPress(marker)}
						>
							<View
								style={[
									local.marker,
									{
										backgroundColor:
											marker.iconFeatures.color,
									},
								]}
							>
								<FontAwesomeIcon
									icon={iconMap[marker.iconFeatures.iconName]}
									color={'white'}
									size={14}
									style={[local.marker.icon]}
								/>
							</View>
						</Marker>
					))}
				</MapView>
			)}

			{selectedMarker && (
				<View style={local.callout}>
					<LocationComponent location={selectedMarker} />
				</View>
			)}
		</SafeAreaView>
	);
};

const mapStateToProps = (state) => {
	return {
		locationsList: state.locationsList,
	};
};

const local = StyleSheet.create({
	container: {
		paddingHorizontal: 0,
		flex: 1,
	},
	map: {
		width: '100%',
		height: '100%',
	},
	marker: {
		padding: 8,
		borderRadius: 20,
		borderColor: '#FFFFFF',
		borderWidth: 2,
	},
	callout: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		padding: 16,
	},
});

export default connect(mapStateToProps)(MapPage);
