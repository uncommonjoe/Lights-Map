import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, query } from 'firebase/firestore';
import auth from '../config/firebase';

import getRegionHook from './GetRegionHook';
import getFeaturesHook from './GetFeaturesHook';

export default function useGetLightList() {
	const [lightList, setLightList] = useState([]);
	const [regionList, apiGetRegionList] = getRegionHook();
	const [featureList, apiGetFeatureList] = getFeaturesHook();
	const db = getFirestore(auth);

	useEffect(() => {
		const fetchData = async () => {
			const fetchedList = await apiGetList();
			setLightList(fetchedList);
		};

		fetchData();
	}, []);

	// api call to get and return list

	const findAssociatedLocalRegion = (listingDataArea, dbRegions) => {
		console.log('listingDataArea', listingDataArea);
		console.log('dbRegions', dbRegions);

		const localRegion = dbRegions.find(
			(region) => region.id === listingDataArea
		);
		return localRegion ? localRegion.name : null;
	};

	const convertFeatureIcon = (listingDataFeatures, dbFeatures) => {
		console.log('listingDataFeatures', listingDataFeatures);
		console.log('dbFeatures', dbFeatures);

		const updatedListFeatures = listingDataFeatures.map((featureId) => {
			const databaseFeature = dbFeatures.find(
				(dbFeature) => dbFeature.id === featureId
			);
			return {
				iconName: databaseFeature ? databaseFeature.iconName : '',
			};
		});

		return updatedListFeatures;
	};

	const apiGetList = async () => {
		const listings = [];

		try {
			const localRegions = await apiGetRegionList();
			const featureList = await apiGetFeatureList();

			const q = query(collection(db, 'listings'));
			const querySnapshot = await getDocs(q);

			querySnapshot.forEach((doc) => {
				const listingData = doc.data();
				const localRegionName = findAssociatedLocalRegion(
					listingData.area,
					localRegions
				);
				const featureIcons = convertFeatureIcon(
					listingData.features,
					featureList
				);
				listings.push({
					...listingData,
					localRegionName,
					featureIcons,
				});
			});

			console.log('-- listings --');
			console.log(listings);

			setLightList(listings);
			return listings;
		} catch (e) {
			console.error('Error getting listings: ', e);
			throw e;
		}
	};

	return [lightList, apiGetList];
}
