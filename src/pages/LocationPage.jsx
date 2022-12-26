import React, { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import {
	StyleSheet,
	Text,
	ImageBackground,
	View,
	SafeAreaView,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMap, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import Moment from 'moment';
import page from '../styles/page.style';
import text from '../styles/text.style';
import button from '../styles/button.style';

export default function LocationPage(payload) {
	const [location, setLocation] = useState(payload.route.params.location);
	const navigation = useNavigation();

	return (
		<SafeAreaView style={[page.whiteBg, { flex: 1 }]}>
			<StatusBar style='dark' />

			<ScrollView style={[page.whiteBg]}>
				<ImageBackground
					source={{
						uri: location.image,
					}}
					resizeMode='cover'
					style={local.image}
				>
					{/*** Like and Bookmark Buttons ***/}
					<View style={local.image.container}>
						<LikeBookmark likesPayload={location.likes} />
					</View>
				</ImageBackground>

				{/*** Location Title, area and description ***/}
				<View style={page.container}>
					<Text style={text.largeTitle}>{location.name}</Text>
					<Text style={text.body}>{location.area}</Text>

					<Text style={[text.body, { marginTop: 15 }]}>
						{location.description}
					</Text>

					{/*** Showtimes box ***/}
					<View style={[local.hoursBox, { marginTop: 15 }]}>
						<Text style={text.smallTitle}>
							{Moment(location.showTimes.dateStarts).format(
								'ddd, MMM D'
							) +
								' - ' +
								Moment(location.showTimes.dateEnds).format(
									'ddd, MMM D'
								)}
						</Text>

						<View style={local.hoursBox.hours}>
							<View>
								<Text style={text.smallTitle}>Mon - Thu</Text>
								<Text style={text.body}>
									{Moment(
										location.showTimes.weekDayTimeStarts
									).format('h:mm A') +
										' - ' +
										Moment(
											location.showTimes.weekDayTimeEnds
										).format('h:mm A')}
								</Text>
							</View>

							<View>
								<Text style={text.smallTitle}>Fri - Sat</Text>
								<Text style={text.body}>
									{Moment(
										location.showTimes.weekEndTimeStart
									).format('h:mm A') +
										' - ' +
										Moment(
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
						marginBottom: 0,
					}}
				>
					<TouchableOpacity
						style={[
							button.button,
							button.green,
							{ marginRight: 10 },
						]}
						onPress={() =>
							navigation.navigate('Map', { location: location })
						}
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
						onPress={() =>
							navigation.navigate('Map', { location: location })
						}
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
			</ScrollView>
		</SafeAreaView>
	);
}

const local = StyleSheet.create({
	image: {
		height: 200,
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
