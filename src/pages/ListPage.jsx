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

const ListPage = ({ featuresList, districtsList, locationsList, route }) => {
	const [refreshing, setRefreshing] = useState(false);
	const [filterType] = useState(
		route.params && route.params.filterType ? route.params.filterType : null
	);
	const [filterId] = useState(
		route.params && route.params.id ? route.params.id : null
	);

	const dispatch = useDispatch();

	const listFilterSort = (list) => {
		// Sorts with most likes at the top
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

	const filterList = (list) => {
		if (filterType === 'district' && filterId) {
			list = list
				.filter(function (item) {
					return item.district === filterId;
				})
				.map(function (item) {
					return item;
				});
		}
		// Return the original list if no filter is applied
		return list;
	};

	const filteredLocationsList = filterList(locationsList);

	return (
		<SafeAreaView style={[page.container]}>
			<FlatList
				data={listFilterSort(filteredLocationsList)}
				keyExtractor={(item) => item.id}
				style={{ marginHorizontal: 15 }}
				renderItem={({ item }) => {
					return <LocationComponent componentLocation={item} />;
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
						onRefresh={getList}
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
