import { Pressable, StyleSheet, View, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const CheckBox = ({ onChange, checked, label, disabled }) => {
	return (
		<Pressable style={local.checkboxBase} onPress={onChange}>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<View
					style={[
						local.box,
						checked && local.boxChecked,
						disabled && local.boxDisabled,
					]}
				>
					{checked && (
						<FontAwesomeIcon
							icon={faCheck}
							color={'white'}
							size={14}
						/>
					)}
				</View>

				<Text style={[local.label, disabled && local.labelDisabled]}>
					{label}
				</Text>
			</View>
		</Pressable>
	);
};

const local = StyleSheet.create({
	checkboxBase: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'left',
		backgroundColor: 'transparent',
		marginBottom: 5,
	},
	box: {
		width: 24,
		height: 24,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 10,
		backgroundColor: 'transparent',
		borderRadius: 5,
		borderWidth: 2,
		borderColor: '#7A8286',
	},
	boxChecked: {
		backgroundColor: '#1669C9',
		borderColor: '#1669C9',
	},
	boxDisabled: {
		backgroundColor: '#f0f0f0',
		borderColor: '#ccc',
	},
	label: {
		fontSize: 16,
	},
	labelDisabled: {
		color: '#aaa',
	},
});

export default CheckBox;
