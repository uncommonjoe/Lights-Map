import React, { useEffect, useState } from 'react';
import {
	Text,
	View,
	FlatList,
	StyleSheet,
	SafeAreaView,
	RefreshControl,
} from 'react-native';
import page from '../styles/page.style';
import LocationComponent from '../components/LocationComponent';
import { connect, useDispatch } from 'react-redux';
import { setLocations } from '../redux/actions';
import apiGetLocations from '../functions/GetLocations';

const ListPage = ({ featuresList, districtsList, locationsList }) => {
	const [refreshing, setRefreshing] = useState(false);

	const dispatch = useDispatch();

	const listFilterSort = (list) => {
		// sorts with most likes at top
		return list.sort((a, b) => b.likes - a.likes);
	};

	const getList = async () => {
		setRefreshing(true);
		try {
			const newList = await apiGetLocations(districtsList, featuresList);
			dispatch(setLocations(newList));
		} catch (error) {
			console.error('Error getting locations:', error);
		} finally {
			setRefreshing(false);
		}
	};

	return (
		<SafeAreaView style={page.container}>
			<FlatList
				data={listFilterSort(locationsList)}
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
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={() => getList()}
					/>
				}
			/>
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
