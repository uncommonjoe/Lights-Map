import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	View,
	SafeAreaView,
	Text,
	ActivityIndicator,
	FlatList,
} from 'react-native';
import page from '../styles/page.style';
import { StatusBar } from 'expo-status-bar';

import getLightList from '../hooks/GetLightListHook';
import LocationComponent from '../components/LocationComponent';

export default ListPage = () => {
	const [isLoading, setLoading] = useState(true);
	const [lightList, apiGetList] = getLightList();

	const asyncGetList = async () => {
		await apiGetList();
		setLoading(false);
	};

	const listFilterSort = (list) => {
		// sorts with most likes at top
		return list.sort((a, b) => b.likes - a.likes);
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
					data={listFilterSort(lightList)}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => {
						return <LocationComponent location={item} />;
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
		icons: {
			marginLeft: 5,
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
