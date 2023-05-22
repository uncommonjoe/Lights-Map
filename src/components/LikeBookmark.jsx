import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { filter } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faThumbsUp, faBookmark } from '@fortawesome/free-solid-svg-icons';

// Custom radio buttons
// https://blog.logrocket.com/create-radio-buttons-react-native/

export default LikeBookmark = ({ likesPayload }) => {
	const [likes, setLikes] = useState(likesPayload);
	const [bookmark, setBookmark] = useState(false);

	// Get likes count and if this locaiton is liked by the current user
	// Get bookmarked data from current user

	// When like is pressed, check to see if user is logged in and store it to their likes
	// If user doesn't exist, prompt with popup to login or create an account

	// When bookmark is pressed, check to see if user is logged in and store it to their bookmarks
	// If user doesn't exist, prompt with popup to login or create an account

	return (
		<View style={local.buttonContainer}>
			<TouchableOpacity style={[local.button, local.leftButton]}>
				<Text>{likes}</Text>
				<FontAwesomeIcon
					icon={faThumbsUp}
					color={'black'}
					size={16}
					style={{ marginLeft: 5 }}
				/>
			</TouchableOpacity>

			<TouchableOpacity style={[local.button, local.rightButton]}>
				<FontAwesomeIcon icon={faBookmark} color={'black'} size={16} />
			</TouchableOpacity>
		</View>
	);
};

const borderRadius = 15;
const local = StyleSheet.create({
	buttonContainer: {
		flexDirection: 'row',
		margin: 15,
	},
	button: {
		paddingVertical: 10,
		backgroundColor: 'white',
		flexDirection: 'row',
		alignItems: 'center',
		height: 40,
	},
	leftButton: {
		paddingLeft: 10,
		paddingRight: 5,
		borderTopLeftRadius: borderRadius,
		borderBottomLeftRadius: borderRadius,
	},
	rightButton: {
		paddingLeft: 5,
		paddingRight: 10,
		borderTopRightRadius: borderRadius,
		borderBottomRightRadius: borderRadius,
	},
});
