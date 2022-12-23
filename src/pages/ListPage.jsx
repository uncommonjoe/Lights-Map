import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	View,
	SafeAreaView,
	Text,
	TouchableOpacity,
	ActivityIndicator,
	FlatList,
	ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import page from '../styles/page.style';
import { StatusBar } from 'expo-status-bar';
import LikeBookmark from '../components/LikeBookmark';

export default ProductAddScreen = () => {
	const [isLoading, setLoading] = useState(false);
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
				dateStarts: '2022-11-24T00:00:00',
				dateEnds: '2022-12-31T00:00:00',
				weekDayTimeStart: '2022-11-24T17:00:00',
				weekDayTimeEnds: '2022-11-24T21:00:00',
				weekEndTimeStart: '2022-11-24T17:00:00',
				weekEndTimeEnds: '2022-11-24T22:00:00',
			},
			features: ['music', 'pixels'],
			numberOfLights: '10,00 - 20,000',
			image: 'https://staging.uncommonjoe.com/wp-content/uploads/2022/12/bethlehem-lights.jpg',
			likes: 256,
		},
		{
			id: 2,
			name: 'Lights on Oasis',
			description:
				'We have 6 houses with approximately 50,000 lights synchronized to Christmas music.',
			address: {
				address1: '641 Oasis Drive',
				city: 'Billings',
				state: 'MT',
				zip: 59105,
			},
			area: 'Heights',
			showTimes: {
				dateStarts: '2022-11-26T00:00:00',
				dateEnds: '2023-01-01T00:00:00',
				weekDayTimeStart: '2022-11-24T17:30:00',
				weekDayTimeEnds: '2022-11-24T21:30:00',
				weekEndTimeStart: '2022-11-24T17:30:00',
				weekEndTimeEnds: '2022-11-24T22:00:00',
			},
			features: ['music', 'pixels'],
			numberOfLights: '50,000+',
			image: 'https://staging.uncommonjoe.com/wp-content/uploads/2022/12/lights-on-oasis.jpg',
			likes: 541,
		},
	]);
	const navigation = useNavigation();

	const selectLocation = (item) => {
		navigation.navigate('Location', { location: item });
	};

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
					renderItem={({ item, index }) => {
						return (
							<TouchableOpacity
								style={local.displayListing}
								onPress={() => selectLocation(item)}
							>
								<ImageBackground
									source={{
										uri: item.image,
									}}
									resizeMode='cover'
									style={local.displayListing.bgImage}
									imageStyle={{
										borderRadius: 20,
									}}
								>
									{/*** Like and Bookmark Buttons ***/}
									<View style={local.section1}>
										<LikeBookmark
											likesPayload={item.likes}
										/>
									</View>

									{/*** Location name section ***/}
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
		flexDirection: 'row',
		justifyContent: 'flex-end',
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
