import React from 'react';
import { Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
	faMap,
	faGear,
	faList,
	faBookmark,
} from '@fortawesome/free-solid-svg-icons';

import BookmarksPage from '../pages/BookmarksPage';
import ListPage from '../pages/ListPage';
import LocationPage from '../pages/LocationPage';
import MapPage from '../pages/MapPage';
import SettingsPage from '../pages/SettingsPage';
import AddLocationPage from '../pages/AddLocationPage';

const List = createNativeStackNavigator();
const Map = createNativeStackNavigator();
const Bookmarks = createNativeStackNavigator();
const Settings = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default Navigation = () => {
	var ListStack = ({}) => (
		<List.Navigator
			screenOptions={() => ({
				gestureEnabled: true,
			})}
			initialRouteName='ListPage'
		>
			<List.Screen
				name='Billings, MT'
				component={ListPage}
				options={{
					header: () => null,
				}}
			/>
			<List.Screen name='Location' component={LocationPage} />
		</List.Navigator>
	);

	var MapStack = ({}) => (
		<Map.Navigator
			screenOptions={() => ({
				gestureEnabled: true,
			})}
		>
			<Map.Screen
				name='Map Page'
				component={MapPage}
				options={{
					header: () => null,
				}}
			/>
			<Map.Screen name='Location' component={LocationPage} />
		</Map.Navigator>
	);

	var BookmarksStack = ({}) => (
		<Bookmarks.Navigator
			screenOptions={() => ({
				gestureEnabled: true,
			})}
		>
			<Bookmarks.Screen
				name='Bookmarks Page'
				component={BookmarksPage}
				options={{
					header: () => null,
				}}
			/>
			<Bookmarks.Screen name='Location' component={LocationPage} />
		</Bookmarks.Navigator>
	);

	var SettingsStack = ({}) => (
		<Settings.Navigator
			screenOptions={() => ({
				gestureEnabled: true,
			})}
		>
			<Settings.Screen
				name='Settings Page'
				options={{
					header: () => null,
				}}
				component={SettingsPage}
			/>
			<Settings.Screen name='Add Location' component={AddLocationPage} />
		</Settings.Navigator>
	);

	function BottomTabBar({ state, descriptors, navigation }) {
		return (
			<SafeAreaView style={local.container}>
				{state.routes.map((route, index) => {
					const { options } = descriptors[route.key];
					const label =
						options.tabBarLabel !== undefined
							? options.tabBarLabel
							: options.title !== undefined
							? options.title
							: route.name;

					const isFocused = state.index === index;

					const onPress = () => {
						const event = navigation.emit({
							type: 'tabPress',
							target: route.key,
						});

						if (!isFocused && !event.defaultPrevented) {
							navigation.navigate(route.name);
						}
					};

					return (
						<TouchableOpacity
							accessibilityRole='button'
							accessibilityState={
								isFocused ? { selected: true } : {}
							}
							accessibilityLabel={
								options.tabBarAccessibilityLabel
							}
							onPress={onPress}
							style={local.buttons}
							key={route.key}
						>
							<FontAwesomeIcon
								icon={
									index == 0
										? faList
										: index == 1
										? faMap
										: index == 2
										? faBookmark
										: faGear
								}
								color={isFocused ? 'white' : '#aaa'}
								size={18}
								style={local.buttons.icons}
							/>
							<Text
								style={[
									{ color: isFocused ? 'white' : '#aaa' },
									local.buttons.text,
								]}
							>
								{label}
							</Text>
						</TouchableOpacity>
					);
				})}
			</SafeAreaView>
		);
	}

	return (
		<Tab.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
			<Tab.Screen name='List' component={ListStack} />
			<Tab.Screen name='Map' component={MapStack} />
			<Tab.Screen name='Bookmarks' component={BookmarksStack} />
			<Tab.Screen name='Settings' component={SettingsStack} />
		</Tab.Navigator>
	);
};

const local = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: '#292B2C',
		alignItems: 'center',
	},
	buttons: {
		flex: 1,
		paddingTop: 10,
		alignItems: 'center',
		icons: {
			marginBottom: 5,
		},
		text: {
			fontSize: 14,
		},
	},
});
