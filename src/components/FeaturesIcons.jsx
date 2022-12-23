import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { filter } from 'lodash';

// Custom radio buttons
// https://blog.logrocket.com/create-radio-buttons-react-native/

const FeaturesIcons = ({ data }) => {
	const [userOption, setUserOption] = useState(null);

	// get array of data and assign which icon to display based upon the value
	// ['music', 'pixels', 'static','walkthrough','lanes','inflatables']

	return (
		<View>
			{data.map((item) => {
				return (
					<FlatList
						key={item.id}
						style={
							item.value === userOption
								? styles.selected
								: styles.unselected
						}
					>
						<Text style={styles.option}>{item.value}</Text>
					</FlatList>
				);
			})}

			<Text>User option: {userOption}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	option: {
		fontSize: 20,
		textAlign: 'center',
		padding: 10,
		color: '#000',
	},
	unselected: {
		backgroundColor: '#f0f0f0',
		marginBottom: 5,
	},
	selected: {
		backgroundColor: 'lightblue',
		marginBottom: 5,
	},
});

export default RadioButton;
