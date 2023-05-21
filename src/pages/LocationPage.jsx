import React, { useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	SafeAreaView,
	ImageBackground,
	TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMap, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import openMap from 'react-native-open-maps';

import Moment from 'moment';
import page from '../styles/page.style';
import text from '../styles/text.style';
import button from '../styles/button.style';
import store from '../redux/store';
import { setSelectedLocation } from '../redux/actions';

export default function LocationPage(payload) {
	const [location, setLocation] = useState(payload.route.params.location);

	const navigation = useNavigation();

	const url = require('../../assets/default-location-image.jpg');
	const img = location.image ? { uri: location.image } : url;

	const convertTimestampToMoment = (timestamp) => {
		const milliseconds =
			timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
		return Moment(milliseconds);
	};

	const navigateToMap = async () => {
		// store to redux, then navigate to map
		await store.dispatch(setSelectedLocation(location));
		navigation.navigate('Map', { selectedLocation: location });
	};

	const openMapsForDirections = async () => {
		const address =
			location.address.address1 +
			' ' +
			location.address.city +
			' ' +
			location.address.state +
			' ' +
			location.address.zip;
		openMap({
			start: 'My Location',
			// waypoints: [
			// 	'1123 Princeton Ave, Billings, MT 59102',
			// 	'2044 Yellowstone Ave Billings MT 59102',
			// ],
			end: address,
		});
	};

	return (
		<ScrollView style={[page.whiteBg, { flex: 1 }]}>
			<StatusBar style='light' />
			<ImageBackground
				source={img}
				resizeMode='cover'
				style={local.image}
			>
				{/*** Like and Bookmark Buttons ***/}
				<SafeAreaView>
					<View style={local.image.container}>
						<LikeBookmark likesPayload={location.likes} />
					</View>
				</SafeAreaView>
			</ImageBackground>

			<SafeAreaView style={[page.whiteBg]}>
				{/*** Location Title, area and description ***/}
				<View style={page.container}>
					<Text style={text.largeTitle}>{location.name}</Text>
					<Text style={text.body}>{location.localRegionName}</Text>

					<Text style={[text.body, { marginTop: 15 }]}>
						{location.description}
					</Text>

					{/*** Showtimes box ***/}
					<View style={[local.hoursBox, { marginTop: 15 }]}>
						<Text style={text.smallTitle}>
							{convertTimestampToMoment(
								location.showTimes.dateStarts
							).format('ddd, MMM D') +
								' - ' +
								convertTimestampToMoment(
									location.showTimes.dateEnds
								).format('ddd, MMM D')}
						</Text>

						<View style={local.hoursBox.hours}>
							<View>
								<Text style={text.smallTitle}>Mon - Thu</Text>
								<Text style={text.body}>
									{convertTimestampToMoment(
										location.showTimes.weekDayTimeStarts
									).format('h:mm A') +
										' - ' +
										convertTimestampToMoment(
											location.showTimes.weekDayTimeEnds
										).format('h:mm A')}
								</Text>
							</View>

							<View>
								<Text style={text.smallTitle}>Fri - Sat</Text>
								<Text style={text.body}>
									{convertTimestampToMoment(
										location.showTimes.weekEndTimeStarts
									).format('h:mm A') +
										' - ' +
										convertTimestampToMoment(
											location.showTimes.weekEndTimeEnds
										).format('h:mm A')}
								</Text>
							</View>
						</View>
					</View>

					<Text style={[text.smallTitle, { marginTop: 25 }]}>
						Address
					</Text>
					<Text style={text.body}>
						{location.address.address1 +
							', ' +
							location.address.city +
							' ' +
							location.address.state +
							', ' +
							location.address.zip}
					</Text>
				</View>

				<View
					style={{
						paddingHorizontal: 15,
						flexDirection: 'row',
						marginBottom: 20,
					}}
				>
					<TouchableOpacity
						style={[
							button.button,
							button.green,
							{ marginRight: 10 },
						]}
						onPress={() => navigateToMap()}
					>
						<View style={button.button.container}>
							<FontAwesomeIcon
								icon={faMap}
								color={'white'}
								size={18}
								style={button.button.icons}
							/>

							<Text
								style={[button.button.text, { marginLeft: 10 }]}
							>
								View on Map
							</Text>
						</View>
					</TouchableOpacity>

					<TouchableOpacity
						style={[button.button, button.red, { marginLeft: 10 }]}
						onPress={() => openMapsForDirections()}
					>
						<View style={button.button.container}>
							<FontAwesomeIcon
								icon={faLocationDot}
								color={'white'}
								size={18}
								style={button.button.icons}
							/>
							<Text
								style={[button.button.text, { marginLeft: 10 }]}
							>
								Directions
							</Text>
						</View>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		</ScrollView>
	);
}

const local = StyleSheet.create({
	image: {
		height: 300,
		container: {
			flex: 1,
			flexDirection: 'row',
			justifyContent: 'flex-end',
		},
	},
	hoursBox: {
		padding: 15,
		backgroundColor: '#EBEBEB',
		borderRadius: 10,
		hours: {
			marginTop: 15,
			flexDirection: 'row',
			justifyContent: 'space-between',
		},
	},
});
