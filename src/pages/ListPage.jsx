import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	View,
	SafeAreaView,
	ScrollView,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard,
	ActivityIndicator,
	FlatList,
	ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import button from '../styles/button.style';
import page from '../styles/page.style';
import LightsOne from '../img/icons/LightsOne';
import { StatusBar } from 'expo-status-bar';

export default ProductAddScreen = () => {
	const [isLoading, setLoading] = useState(false);
	const [selectedId, setSelectedId] = useState(null);
	const [homeList, setHomeList] = useState([
		{
			id: 1,
			name: 'Bethlehem Lights',
			description:
				'Our Christmas lights are synchronized to music so when you drive up, tune your car radio to 88.3 FM. Our total show length is 17 minutes, however you can stay for one song or all of them!',
			address: {
				address1: '2705 Beth Dr.',
				city: 'Billings',
				state: 'MT',
				zip: 59102,
			},
			area: 'West End',
			showTimes: {
				dateStarts: '2022-11-24',
				dateEnds: '2022-12-31',
				weekDayTimeStart: '17:00',
				weekDayTimeEnds: '21:00',
				weekEndTimeStart: '17:00',
				weekEndTimeEnds: '22:00',
			},
			features: ['music', 'pixels'],
			numberOfLights: '10,00 - 20,000',
			backgroundImage:
				'https://staging.uncommonjoe.com/wp-content/uploads/2022/12/bethlehem-lights.jpg',
		},
		{
			id: 2,
			name: 'Lights on Oasis',
			description:
				'Our Christmas lights are synchronized to music so when you drive up, tune your car radio to 88.3 FM. Our total show length is 17 minutes, however you can stay for one song or all of them!',
			address: {
				address1: '641 Oasis Drive',
				city: 'Billings',
				state: 'MT',
				zip: 59105,
			},
			area: 'Heights',
			showTimes: {
				dateStarts: '2022-11-26',
				dateEnds: '2023-01-01',
				weekDayTimeStart: '17:30',
				weekDayTimeEnds: '21:30',
				weekEndTimeStart: '17:30',
				weekEndTimeEnds: '22:00',
			},
			features: ['music', 'pixels'],
			numberOfLights: '50,000+',
			backgroundImage:
				'https://staging.uncommonjoe.com/wp-content/uploads/2022/12/lights-on-oasis.jpg',
		},
	]);
	const [date, setDate] = useState(new Date());

	useEffect(() => {}, []);

	return (
		<SafeAreaView style={page.container}>
			<StatusBar />

			{isLoading ? (
				<ActivityIndicator />
			) : (
				<FlatList
					data={homeList}
					keyExtractor={(item) => item.id}
					extraData={selectedId}
					renderItem={({ item, index }) => {
						return (
							<TouchableOpacity style={local.displayListing}>
								<ImageBackground
									source={{
										uri: item.backgroundImage,
									}}
									resizeMode='cover'
									style={local.displayListing.bgImage}
									imageStyle={{
										borderRadius: 20,
									}}
								>
									<View style={local.section1}></View>

									<LinearGradient
										colors={[
											'rgba(0,0,0,.0)',
											'rgba(0,0,0,.8)',
											'rgba(0,0,0,.9)',
										]}
										style={local.section2}
									>
										<View
											style={
												local.displayListing.contents
											}
										>
											<Text
												style={
													local.displayListing.title
												}
											>
												{item.name}
											</Text>

											<Text
												style={
													local.displayListing
														.subtitle
												}
											>
												{item.area}
											</Text>
										</View>
									</LinearGradient>
								</ImageBackground>
							</TouchableOpacity>
						);
					}}
					ListEmptyComponent={() =>
						todaysObject?.length == 0 && (
							<View style={styles.noReadingWrap}>
								<Text style={styles.noReading}>
									No reading for today. Select another date.
								</Text>
							</View>
						)
					}
				/>
			)}
		</SafeAreaView>
	);
};

const local = StyleSheet.create({
	section1: {
		flex: 1,
	},
	section2: {
		padding: 20,
		flexDirection: 'row',
		borderBottomRightRadius: 20,
		borderBottomLeftRadius: 20,
	},
	displayListing: {
		marginBottom: 15,
		height: 200,
		bgImage: {
			flex: 1,
		},
		contents: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			width: '100%',
		},
		title: {
			color: 'white',
			fontSize: 18,
			fontWeight: '800',
		},
		subtitle: {
			color: 'white',
			fontSize: 16,
		},
	},
});
