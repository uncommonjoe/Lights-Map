export default {
	expo: {
		name: 'lights-map',
		slug: 'lights-map',
		version: '1.1.a4db8d7',
		orientation: 'portrait',
		icon: './src/assets/img/icon.png',
		splash: {
			image: './src/assets/img/splash.png',
			tabletImage: './src/assets/img//splash-tablet.png',
			resizeMode: 'cover',
			backgroundColor: '#ffffff',
		},
		updates: {
			fallbackToCacheTimeout: 0,
		},
		assetBundlePatterns: ['**/*'],
		ios: {
			supportsTablet: true,
			bundleIdentifier: 'com.uncommonjoe.lightmap',
			googleServicesFile: './src/config/GoogleService-Info.plist',
		},
		android: {
			versionCode: 1,
			versionName: '1.1.0',
			package: 'com.uncommonjoe.lightmap',
			googleServicesFile: './src/config/google-services.json',
			adaptiveIcon: {
				foregroundImage: './src/assets/img/adaptive-icon.png',
				backgroundColor: '#FFFFFF',
			},
		},
		web: {
			favicon: './src/assets/img/favicon.png',
		},
		expo: {
			plugins: [
				[
					'expo-image-picker',
					{
						photosPermission: 'Allow Light Map to access photos',
					},
				],
				[
					'expo-location',
					{
						locationAlwaysAndWhenInUsePermission:
							'Allow Light Map to use your location.',
					},
				],
			],
		},
	},
};
