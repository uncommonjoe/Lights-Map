import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	ActivityIndicator,
} from 'react-native';
import page from '../styles/page.style';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import { iconMap } from '../modules/IconMapModule';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const MapPage = ({ lightList }) => {
	const [isLoading, setIsLoading] = useState(false);

	return (
		<SafeAreaView style={[page.container, local.container]}>
			<StatusBar style='auto' />

			{isLoading ? (
				<ActivityIndicator />
			) : (
				<MapView
					style={local.map}
					initialRegion={{
						latitude: 45.7833,
						longitude: -108.5007,
						latitudeDelta: 0.2,
						longitudeDelta: 0.2,
					}}
				>
					{lightList.map((marker, index) => (
						<Marker
							key={index}
							coordinate={{
								latitude: marker.geo_location.latitude,
								longitude: marker.geo_location.longitude,
							}}
							title={marker.name}
							description={marker.localRegionName}
							anchor={[0, 0]}
						>
							<View
								style={[
									local.marker,
									{
										backgroundColor:
											marker.iconFeatures.color,
									},
								]}
							>
								<FontAwesomeIcon
									icon={iconMap[marker.iconFeatures.iconName]}
									color={'white'}
									size={14}
									style={[local.marker.icon]}
								/>
							</View>
						</Marker>
					))}
				</MapView>
			)}
		</SafeAreaView>
	);
};

const mapStateToProps = (state) => {
	return {
		lightList: state.lightList,
	};
};

const local = StyleSheet.create({
	container: {
		paddingHorizontal: 0,
	},
	map: {
		width: '100%',
		height: '100%',
	},
	marker: {
		padding: 8,
		borderRadius: 20,
		borderColor: '#FFFFFF',
		borderWidth: 2,
		icon: {},
		red: {
			backgroundColor: 'red',
		},
		green: {
			backgroundColor: 'green',
		},
	},
});

export default connect(mapStateToProps)(MapPage);
