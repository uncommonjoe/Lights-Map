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
		// console.log('listingDataArea', listingDataArea);
		// console.log('dbRegions', dbRegions);

		const localRegion = dbRegions.find(
			(region) => region.id === listingDataArea
		);
		return localRegion ? localRegion.name : null;
	};

	const convertFeatureIcon = (listingDataFeatures, dbFeatures) => {
		// console.log('listingDataFeatures', listingDataFeatures);
		// console.log('dbFeatures', dbFeatures);

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

	function getLowestFeatureWithDetails(features, dbFeatures) {
		const lowestFeatureId = Math.min(...features);
		const feature = dbFeatures.find(
			(dbFeature) => dbFeature.id === lowestFeatureId
		);

		let color;
		if (feature) {
			switch (lowestFeatureId) {
				case 1: // Lights to music
					color = '#42A5A5';
					break;
				case 2: // Walkthrough
					color = '#A5A142';
					break;
				case 3: // Lanes & Themed Streets
					color = '#42A56F';
					break;
				case 4: // RGB Pixels
					color = '#425EA5';
					break;
				case 5: // Static Lights
					color = '#A54242';
					break;
				case 6: // Inflatables
					color = '#A542A5';
					break;
				default:
					color = null;
			}
		}

		return {
			id: lowestFeatureId,
			name: feature ? feature.name : null,
			iconName: feature ? feature.iconName : null,
			color: color,
		};
	}

	const apiGetList = async () => {
		const listings = [];

		try {
			const localRegions = await apiGetRegionList();
			const featureList = await apiGetFeatureList();

			const q = query(collection(db, 'listings'));
			const querySnapshot = await getDocs(q);

			// Loop through each listing
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

				const iconFeatures = getLowestFeatureWithDetails(
					listingData.features,
					featureList
				);

				listings.push({
					...listingData,
					localRegionName,
					featureIcons,
					iconFeatures,
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
