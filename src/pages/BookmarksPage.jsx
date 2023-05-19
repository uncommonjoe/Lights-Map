import { StyleSheet, Text, View } from 'react-native';

export default function BookmarksPage() {
	return (
		<View style={styles.container}>
			<Text>Bookmarks</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
