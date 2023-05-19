import { StyleSheet, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import page from '../styles/page.style';
import button from '../styles/button.style';

export default function SettingsPage() {
	const navigation = useNavigation();

	return (
		<SafeAreaView style={page.container}>
			<TouchableOpacity
				style={button.listButton}
				onPress={() => navigation.navigate('Add Location')}
			>
				<Text style={button.listButton.title}>Add Location</Text>

				<FontAwesomeIcon
					icon={faCirclePlus}
					color={'black'}
					size={22}
					style={button.listButton.icon}
				/>
			</TouchableOpacity>
		</SafeAreaView>
	);
}

const local = StyleSheet.create({});
