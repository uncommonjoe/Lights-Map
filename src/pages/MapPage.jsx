import { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import page from '../styles/page.style';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { iconMap } from '../modules/IconMapModule';
import LocationComponent from '../components/LocationComponent';
import { useIsFocused } from '@react-navigation/native';

const MapPage = ({ locationsList, selectedLocation }) => {
	const [selectedMarker, setSelectedMarker] = useState(null);
	const mapRef = useRef(null);
	const markerRef = useRef(null);
	const isFocused = useIsFocused();

	const initial = async () => {
		console.log('markerRef.current', markerRef.current);

		if (markerRef.current) {
			markerRef.current.showCallout();
		}
		if (isFocused && selectedLocation) {
			console.log('focused');

			await handleMarkerPress(selectedLocation);
			markerRef.current.showCallout();
		} else {
			console.log('unfocused');
			await setSelectedMarker(null);
			markerRef.current.hideCallout();
		}
	};

	useEffect(() => {
		initial();
	}, [selectedLocation, isFocused]);

	const handleMarkerPress = async (marker) => {
		// Clears out old selectedMarker and sets the new marker that was pressed
		await setSelectedMarker(null);
		await setSelectedMarker(marker);

		// Move map to center of selected marker
		mapRef.current.animateToRegion({
			latitude: marker.geoLocation.latitude,
			longitude: marker.geoLocation.longitude,
			latitudeDelta: 0.2,
			longitudeDelta: 0.2,
		});

		// Remove selection if marker is selected again
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
			<MapView
				style={local.map}
				initialRegion={{
					latitude: 45.7833,
					longitude: -108.5007,
					latitudeDelta: 0.2,
					longitudeDelta: 0.2,
				}}
				ref={mapRef}
				onPress={handleMapPress}
			>
				{locationsList.map((marker, index) => (
					<Marker
						key={index}
						ref={markerRef}
						coordinate={{
							latitude: marker.geoLocation.latitude,
							longitude: marker.geoLocation.longitude,
						}}
						title={marker.name}
						anchor={[0, 0]}
						onPress={() => handleMarkerPress(marker)}
					>
						<View
							style={[
								local.marker,
								{
									backgroundColor: marker.iconFeatures.color,
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

			{selectedMarker && (
				<View style={local.callout}>
					<LocationComponent componentLocation={selectedMarker} />
				</View>
			)}
		</SafeAreaView>
	);
};

const mapStateToProps = (state) => {
	return {
		locationsList: state.locationsList,
		selectedLocation: state.selectedLocation,
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
