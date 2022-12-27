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

import getLightList from '../hooks/GetLightListHook';

export default ProductAddScreen = () => {
	const [isLoading, setLoading] = useState(true);
	const [lightList, apiGetList] = getLightList();

	const navigation = useNavigation();

	const selectLocation = (item) => {
		navigation.navigate('Location', { location: item });
	};

	const asyncGetList = async () => {
		await apiGetList();
		setLoading(false);
	};

	useEffect(() => {
		asyncGetList();
	}, []);

	return (
		<SafeAreaView style={page.container}>
			<StatusBar />

			{isLoading ? (
				<ActivityIndicator />
			) : (
				<FlatList
					data={lightList}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => {
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
					ListEmptyComponent={() => (
						<View style={local.noResultsWrap}>
							<Text style={local.noResultsText}>
								No results found.
							</Text>
						</View>
					)}
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
