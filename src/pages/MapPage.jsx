import { useEffect, useState } from 'react';
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
import getLightList from '../hooks/GetLightListHook';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
	faMusic,
	faTree,
	faCar,
	faPersonWalking,
} from '@fortawesome/free-solid-svg-icons';

export default function MapPage() {
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
					<Marker
						title='Bethlehem Lights'
						description='2705 Beth Dr'
						anchor={[0, 0]}
						coordinate={{
							latitude: 45.79695,
							longitude: -108.58033,
						}}
					>
						<View style={[local.marker, local.marker.red]}>
							<FontAwesomeIcon
								icon={faMusic}
								color={'white'}
								size={18}
								style={local.marker.icon}
							/>
						</View>
					</Marker>
					<Marker
						title='Lights on Oasis'
						description='641 Oasis Drive'
						anchor={[0, 0]}
						coordinate={{
							latitude: 45.81006,
							longitude: -108.49896,
						}}
					>
						<View style={[local.marker, local.marker.red]}>
							<FontAwesomeIcon
								icon={faMusic}
								color={'white'}
								size={18}
								style={local.marker.icon}
							/>
						</View>
					</Marker>
					<Marker
						title='Something Else'
						description='123 Any Lane'
						anchor={[0, 0]}
						coordinate={{
							latitude: 45.80006,
							longitude: -108.47496,
						}}
					>
						<View style={[local.marker, local.marker.green]}>
							<FontAwesomeIcon
								icon={faTree}
								color={'white'}
								size={18}
								style={local.marker.icon}
							/>
						</View>
					</Marker>

					{/* {lightList.map((marker, index) => (
					<Marker
						key={index}
						coordinate={marker.latlng}
						title={marker.title}
						description={marker.description}
					/>
				))} */}
				</MapView>
			)}
		</SafeAreaView>
	);
}

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
		icon: {},
		red: {
			backgroundColor: 'red',
		},
		green: {
			backgroundColor: 'green',
		},
	},
});
