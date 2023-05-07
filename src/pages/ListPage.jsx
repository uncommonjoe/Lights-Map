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
import { connect } from 'react-redux';
import { setLightList } from '../redux/actions';

import useGetLightList from '../functions/GetLightList';
import LocationComponent from '../components/LocationComponent';

const ListPage = ({ lightList, setLightList }) => {
	const [isLoading, setLoading] = useState(true);
	const [localLightList, getLightList] = useGetLightList();

	async function asyncGetList() {
		setLoading(true);
		const fetchedList = await getLightList();
		setLightList(fetchedList);
		setLoading(false);
	}

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

const mapStateToProps = (state) => {
	return {
		lightList: state.lightList,
	};
};

const mapDispatchToProps = {
	setLightList,
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

export default connect(mapStateToProps, mapDispatchToProps)(ListPage);
