import { StatusBar } from 'expo-status-bar';
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	TouchableOpacity,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import page from '../styles/page.style';

export default function SettingsPage() {
	const navigation = useNavigation();

	return (
		<SafeAreaView style={page.container}>
			<StatusBar />

			<TouchableOpacity
				style={local.listButton}
				onPress={() => navigation.navigate('Add Location')}
			>
				<Text style={local.listButton.title}>Add Location</Text>

				<FontAwesomeIcon
					icon={faCirclePlus}
					color={'black'}
					size={22}
					style={local.listButton.icon}
				/>
			</TouchableOpacity>
		</SafeAreaView>
	);
}

const local = StyleSheet.create({
	listButton: {
		backgroundColor: '#f0f0f0',
		width: '100%',
		borderRadius: 10,
		padding: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 10,
		title: {
			fontSize: 18,
			fontWeight: 'bold',
		},
		icon: {},
	},
});
