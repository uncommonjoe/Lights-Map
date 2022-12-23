import React, { useEffect, useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import {
	StyleSheet,
	Text,
	Image,
	View,
	SafeAreaView,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMap, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import Moment from 'moment';
import page from '../styles/page.style';
import text from '../styles/text.style';
import button from '../styles/button.style';

export default function LocationPage(location) {
	const [payload, setPayload] = useState(location.route.params.location);

	return (
		<SafeAreaView style={[page.whiteBg, { flex: 1 }]}>
			<StatusBar style='dark' />

			<ScrollView style={[page.whiteBg]}>
				<Image style={local.image} source={{ uri: payload.image }} />

				<View style={page.container}>
					<Text style={text.largeTitle}>{payload.name}</Text>
					<Text style={text.body}>{payload.area}</Text>

					<Text style={[text.body, { marginTop: 25 }]}>
						{payload.description}
					</Text>

					<View style={[local.hoursBox, { marginTop: 25 }]}>
						<Text style={text.smallTitle}>
							{Moment(payload.showTimes.dateStarts).format(
								'ddd, MMM D'
							) +
								' - ' +
								Moment(payload.showTimes.dateEnds).format(
									'ddd, MMM D'
								)}
						</Text>

						<View style={local.hoursBox.hours}>
							<View>
								<Text style={text.smallTitle}>Mon - Thu</Text>
								<Text style={text.body}>
									{Moment(
										payload.showTimes.weekDayTimeStarts
									).format('h:mm A') +
										' - ' +
										Moment(
											payload.showTimes.weekDayTimeEnds
										).format('h:mm A')}
								</Text>
							</View>

							<View>
								<Text style={text.smallTitle}>Fri - Sat</Text>
								<Text style={text.body}>
									{Moment(
										payload.showTimes.weekEndTimeStart
									).format('h:mm A') +
										' - ' +
										Moment(
											payload.showTimes.weekEndTimeEnds
										).format('h:mm A')}
								</Text>
							</View>
						</View>
					</View>

					<Text style={[text.smallTitle, { marginTop: 25 }]}>
						Address
					</Text>
					<Text style={text.body}>
						{payload.address.address1 +
							', ' +
							payload.address.city +
							' ' +
							payload.address.state +
							', ' +
							payload.address.zip}
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
								View on Map
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
