import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BookmarksPage from '../pages/BookmarksPage';
import ListPage from '../pages/ListPage';
import LocationPage from '../pages/LocationPage';
import MapPage from '../pages/MapPage';
import SettingsPage from '../pages/SettingsPage';
import AddLocationPage from '../pages/AddLocationPage';

const List = createNativeStackNavigator();
const Map = createNativeStackNavigator();
const Bookmarks = createBottomTabNavigator();
const Settings = createBottomTabNavigator();
const Tab = createBottomTabNavigator();

export default BottomTab = () => {
	var ListStack = ({}) => (
		<List.Navigator
			screenOptions={() => ({
				gestureEnabled: true,
			})}
			initialRouteName='ListPage'
		>
			<List.Screen
				name='List'
				options={{
					header: () => null,
				}}
				component={ListPage}
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
				name='Map'
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
				name='Bookmarks'
				options={{
					header: () => null,
				}}
				component={BookmarksPage}
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
				name='Settings'
				options={{
					header: () => null,
				}}
				component={SettingsPage}
			/>
			<Settings.Screen name='Add Location' component={AddLocationPage} />
		</Settings.Navigator>
	);

	return (
		<Tab.Navigator>
			<Tab.Screen name='List' component={ListStack} />
			<Tab.Screen name='Map' component={MapStack} />
			<Tab.Screen name='Bookmarks' component={BookmarksStack} />
			<Tab.Screen name='Settings' component={SettingsStack} />
		</Tab.Navigator>
	);
};
