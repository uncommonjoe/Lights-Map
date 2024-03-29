import React, { useEffect, useState } from 'react';
import {
	Text,
	View,
	FlatList,
	ScrollView,
	StyleSheet,
	SafeAreaView,
	TouchableOpacity,
} from 'react-native';
import page from '../styles/page.style';
import text from '../styles/text.style';
import button from '../styles/button.style';
import { connect, useDispatch } from 'react-redux';
import { setLocations } from '../redux/actions';
import LandingHeader from '../components/LandingHeaderComponent';
import LocationComponent from '../components/LocationComponent';
import FeaturesButton from '../components/FeaturesButton';
import DistrictsButton from '../components/DistrictsButton';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { getDistance, convertDistance } from 'geolib';

const LandingPage = ({ featuresList, districtsList, locationsList }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
	const [nearMeList, setNearMeList] = useState([]);
	const [mostPopular, setMostPopular] = useState();
	const navigation = useNavigation();

	useEffect(() => {
		// Create a copy of the locationsList array
		const sortedArray = [...locationsList];

		// Sort the copy in descending order based on the 'likes' property
		sortedArray.sort((a, b) => b.likes - a.likes);

		// Update the mostPopular array with the top three most liked objects
		const updatedMostPopular = sortedArray.splice(0, 3);

		// Set the state variable with the updated mostPopular array
		setMostPopular(updatedMostPopular);

		findNearestLocations();
	}, []);

	const findNearestLocations = async () => {
		const currentLocation = await getCurrentLocation();
		if (!currentLocation) {
			// Handle current location not available
			return [];
		}

		const nearestLocations = locationsList.filter((location) => {
			const distance = calculateDistance(
				currentLocation,
				location.geoLocation
			);
			return distance <= 4;
		});

		nearestLocations.sort((a, b) => {
			const distanceA = calculateDistance(currentLocation, a.geoLocation);
			const distanceB = calculateDistance(currentLocation, b.geoLocation);
			return distanceA - distanceB;
		});

		setNearMeList(nearestLocations);
	};

	const getCurrentLocation = async () => {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== 'granted') {
			// Handle permission not granted
			return;
		}

		let { coords } = await Location.getCurrentPositionAsync({});
		return {
			latitude: coords.latitude,
			longitude: coords.longitude,
		};
	};

	const calculateDistance = (startLocation, endLocation) => {
		const distance = getDistance(startLocation, endLocation);
		return convertDistance(distance, 'mi');
	};

	return (
		<SafeAreaView style={[page.whiteBg, { flex: 1 }]}>
			<ScrollView>
				<LandingHeader />

				<View>
					<View style={[local.section, local.horizontal]}>
						<Text style={text.largeTitle}>Most Popular</Text>
						<TouchableOpacity
							onPress={() => navigation.navigate('ListPage')}
							style={{ marginTop: 20 }}
						>
							<Text style={button.link}>View All</Text>
						</TouchableOpacity>
					</View>

					<FlatList
						data={mostPopular}
						keyExtractor={(item) => item.id}
						style={{ paddingHorizontal: 15 }}
						horizontal={true}
						decelerationRate={0}
						scrollEventThrottle={1}
						showsHorizontalScrollIndicator={'false'}
						snapToInterval={300} //your element width
						snapToAlignment={'center'}
						ListEmptyComponent={() => (
							<View>
								<Text>No results found.</Text>
							</View>
						)}
						renderItem={({ item }) => {
							return (
								<View style={{ marginRight: 10 }}>
									<LocationComponent
										componentLocation={item}
										componentSize={'md'}
									/>
								</View>
							);
						}}
					/>
				</View>

				{nearMeList && nearMeList.length > 0 ? (
					<View>
						<View style={local.section}>
							<Text style={text.largeTitle}>Near Me</Text>
						</View>
						<FlatList
							data={nearMeList}
							keyExtractor={(item) => item.id}
							style={{ paddingHorizontal: 15 }}
							horizontal={true}
							decelerationRate={0}
							scrollEventThrottle={1}
							showsHorizontalScrollIndicator={'false'}
							snapToInterval={150} //your element width
							snapToAlignment={'center'}
							ListEmptyComponent={() => (
								<View>
									<Text>No results found.</Text>
								</View>
							)}
							renderItem={({ item }) => {
								return (
									<View style={{ marginRight: 10 }}>
										<LocationComponent
											componentLocation={item}
											componentSize={'sm'}
										/>
									</View>
								);
							}}
						/>
					</View>
				) : null}

				{districtsList ? (
					<View>
						<View style={local.section}>
							<Text style={text.largeTitle}>Districts</Text>
						</View>
						<FlatList
							data={districtsList}
							keyExtractor={(item) => item.id}
							style={{ paddingHorizontal: 15 }}
							horizontal={true}
							decelerationRate={0}
							scrollEventThrottle={1}
							showsHorizontalScrollIndicator={'false'}
							snapToInterval={300} //your element width
							snapToAlignment={'center'}
							ListEmptyComponent={() => (
								<View>
									<Text>No results found.</Text>
								</View>
							)}
							renderItem={({ item }) => {
								return (
									<View style={{ marginRight: 10 }}>
										<DistrictsButton district={item} />
									</View>
								);
							}}
						/>
					</View>
				) : null}

				{featuresList ? (
					<View style={{ marginBottom: 15 }}>
						<View style={local.section}>
							<Text style={text.largeTitle}>Features</Text>
						</View>

						<FlatList
							data={featuresList}
							keyExtractor={(item) => item.id}
							style={{ paddingHorizontal: 15 }}
							horizontal={true}
							decelerationRate={0}
							scrollEventThrottle={1}
							showsHorizontalScrollIndicator={'false'}
							snapToInterval={100} //your element width
							snapToAlignment={'center'}
							ListEmptyComponent={() => (
								<View>
									<Text>No results found.</Text>
								</View>
							)}
							renderItem={({ item }) => {
								return (
									<View style={{ marginRight: 10 }}>
										<FeaturesButton feature={item} />
									</View>
								);
							}}
						/>
					</View>
				) : null}
			</ScrollView>
		</SafeAreaView>
	);
};

const mapStateToProps = (state) => {
	return {
		featuresList: state.featuresList,
		districtsList: state.districtsList,
		locationsList: state.locationsList,
	};
};

const mapDispatchToProps = {
	setLocations,
};

const local = StyleSheet.create({
	section: {
		paddingHorizontal: 15,
	},
	horizontal: {
		flexDirection: 'row',
		alignItems: 'center',
		alignContent: 'center',
		justifyContent: 'space-between',
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
