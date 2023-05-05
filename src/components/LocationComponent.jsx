import React, { useCallback, useState } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	ImageBackground,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
	faPalette,
	faMusic,
	faTree,
	faCar,
	faSleigh,
	faPersonWalking,
} from '@fortawesome/free-solid-svg-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import LikeBookmark from '../components/LikeBookmark';

export default function LocationComponent(payload) {
	const [location, setLoacation] = useState(payload.location);
	const navigation = useNavigation();

	const iconMap = {
		palette: faPalette,
		music: faMusic,
		tree: faTree,
		car: faCar,
		sleigh: faSleigh,
		personWalking: faPersonWalking,
	};

	const selectLocation = useCallback(
		(item) => {
			navigation.navigate('Location', { location: item });
		},
		[navigation]
	);

	return (
		<TouchableOpacity
			style={local.displayListing}
			onPress={() => selectLocation(location)}
		>
			<ImageBackground
				source={{
					uri: location.image,
				}}
				resizeMode='cover'
				style={local.displayListing.bgImage}
				imageStyle={{
					borderRadius: 20,
				}}
			>
				{/*** Like and Bookmark Buttons ***/}
				<View style={local.section1}>
					<LikeBookmark likesPayload={location.likes} />
				</View>

				{/*** Location name section ***/}
				<LinearGradient
					colors={[
						'rgba(0,0,0,.0)',
						'rgba(0,0,0,.8)',
						'rgba(0,0,0,.9)',
					]}
					style={local.section2}
				>
					<View style={local.displayListing.contents}>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
							}}
						>
							<Text style={local.displayListing.title}>
								{location.name}
							</Text>

							{location.featureIcons.map((icon, index) => {
								const iconName = icon.iconName;
								const mappedIcon = iconMap[iconName];

								if (!mappedIcon) {
									console.warn(
										`Invalid icon name: ${iconName}`
									);
									return null;
								}

								return (
									<View
										key={index}
										style={{
											marginRight: 5,
										}}
									>
										<FontAwesomeIcon
											icon={mappedIcon}
											color={'white'}
											size={14}
											style={local.displayListing.icons}
										/>
									</View>
								);
							})}
						</View>

						<Text style={local.displayListing.subtitle}>
							{location.localRegionName}
						</Text>
					</View>
				</LinearGradient>
			</ImageBackground>
		</TouchableOpacity>
	);
}

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
