import { useEffect, useState } from 'react';

export default function useLowestFeatureHook(payload) {
	const [payload, setPayload] = useState(payload);

	useEffect(() => {
		getLowestFeatureWithDetails(payload.features, payload.dbFeatures);
	}, []);

	function getLowestFeatureWithDetails(features, dbFeatures) {
		const lowestFeatureId = Math.min(...features);
		const feature = dbFeatures.find(
			(dbFeature) => dbFeature.id === lowestFeatureId
		);

		let color;
		if (feature) {
			switch (lowestFeatureId) {
				case 1:
					color = '#4295A5';
					break;
				case 2:
					color = '#CA503F';
					break;
				case 3:
					color = '#459B5E';
					break;
				case 4:
					color = 'your_color_value_here';
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

	return [useLowestFeatureHook];
}
