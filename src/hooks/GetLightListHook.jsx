import React, { useState } from 'react';

export default function getLightList() {
	const [lightList, setLightList] = useState({});

	// api call to get and return list

	const apiGetList = async () => {
		try {
			const response = await fetch('../api/holidayLightList.json');
			const json = await response.json();

			console.warn(response);

			setLightList(json);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	return [lightList, apiGetList];
}
