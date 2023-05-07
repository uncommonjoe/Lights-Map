import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
	StyleSheet,
	Text,
	SafeAreaView,
	TouchableOpacity,
	View,
	TextInput,
	Button,
	Image,
	ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendar, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import page from '../styles/page.style';
import form from '../styles/form.style';
import button from '../styles/button.style';

const AddLocationPage = () => {
	const [locationName, setLocationName] = useState('');
	const [street, setStreet] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('MT');
	const [zip, setZip] = useState('');
	const [image, setImage] = useState(null);
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [selectedTime, setSelectedTime] = useState(new Date());

	const handleDateChange = (event, selectedDate) => {
		const currentDate = selectedDate;
		setSelectedDate(currentDate);
	};

	const handleTimeChange = (event, selectedTime) => {
		const currentTime = selectedTime;
		setSelectedTime(currentTime);
	};

	const handlePhotoSelection = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		console.log(result);

		if (!result.canceled) {
			setImage(result.assets[0].uri);
			console.log(image.uri);
		}
	};

	const handlePhotoCapture = async () => {
		// Open the device's camera and let the user capture a photo
		const result = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		console.log(result);

		if (!result.canceled) {
			setImage(result.assets[0].uri);
			console.log(image);
		}
	};

	useEffect(() => {
		// Request permissions for accessing the device's camera roll
		(async () => {
			const { status } =
				await ImagePicker.requestMediaLibraryPermissionsAsync();
			if (status !== 'granted') {
				console.log('Permission denied');
			}
		})();
	}, []);

	return (
		<SafeAreaView style={page.container}>
			<ScrollView>
				{/* Location Name */}
				<View style={form.container}>
					<Text style={form.label}>Location Name</Text>
					<TextInput
						placeholder='eg. Smith Family Lights'
						value={locationName}
						onChangeText={setLocationName}
						style={form.textInput}
					/>
				</View>

				{/* Address */}
				<View style={form.container}>
					<Text style={form.label}>Address</Text>
					<TextInput
						placeholder='eg. 1234 Any Lane'
						value={street}
						onChangeText={setStreet}
						style={form.textInput}
					/>
				</View>

				{/* City, State Zip */}
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}
				>
					<View style={[form.container, { width: '35%' }]}>
						<Text style={form.label}>City</Text>
						<TextInput
							placeholder='eg. Billings'
							value={city}
							onChangeText={setCity}
							style={form.textInput}
						/>
					</View>

					<View style={[form.container, { width: '20%' }]}>
						<Text style={form.label}>State</Text>
						<TextInput
							maxLength='2'
							value={state}
							onChangeText={setState}
							style={form.textInput}
						/>
					</View>

					<View style={[form.container, { width: '35%' }]}>
						<Text style={form.label}>Zip</Text>
						<TextInput
							placeholder='eg. 59101'
							value={zip}
							onChangeText={setZip}
							style={form.textInput}
						/>
					</View>
				</View>

				{/* Photo */}
				<View style={form.container}>
					<Text style={form.label}>Attach Photo</Text>

					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
						}}
					>
						<TouchableOpacity
							style={[button.formButton, { marginRight: 10 }]}
							onPress={handlePhotoSelection}
						>
							<Text>Select Photo</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={[button.formButton, { marginLeft: 10 }]}
							onPress={handlePhotoCapture}
						>
							<Text>Take Photo</Text>
						</TouchableOpacity>
					</View>
					{image && (
						<Image
							source={{ uri: image }}
							style={{ width: 200, height: 200 }}
						/>
					)}
				</View>

				{/* Show Dates */}
				<Text
					style={[form.label, { fontWeight: 'bold', marginTop: 20 }]}
				>
					What dates does your display run?
				</Text>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}
				>
					<View
						style={[
							form.container,
							{ width: '45%', alignItems: 'left' },
						]}
					>
						<Text style={form.label}>Starts</Text>
						<DateTimePicker
							value={selectedDate}
							mode='date'
							onChange={handleDateChange}
						/>
					</View>

					<View
						style={[
							form.container,
							{ width: '45%', alignItems: 'left' },
						]}
					>
						<Text style={form.label}>Ends</Text>

						<DateTimePicker
							value={selectedDate}
							mode='date'
							onChange={handleDateChange}
						/>
					</View>
				</View>

				{/* Show Times */}
				<Text
					style={[form.label, { fontWeight: 'bold', marginTop: 20 }]}
				>
					What time of day does your display run?
				</Text>

				{/* Weekday Times */}
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}
				>
					<View
						style={[
							form.container,
							{ width: '45%', alignItems: 'left' },
						]}
					>
						<Text style={form.label}>Weekday Starts</Text>
						<DateTimePicker
							value={selectedTime}
							mode='time'
							onChange={handleTimeChange}
							minuteInterval={15}
						/>
					</View>

					<View
						style={[
							form.container,
							{ width: '45%', alignItems: 'left' },
						]}
					>
						<Text style={form.label}>Weekday Ends</Text>
						<DateTimePicker
							value={selectedTime}
							mode='time'
							onChange={handleTimeChange}
							minuteInterval={15}
						/>
					</View>
				</View>

				{/* Weekend Times */}
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}
				>
					<View
						style={[
							form.container,
							{ width: '45%', alignItems: 'left' },
						]}
					>
						<Text style={form.label}>Weekend Starts</Text>
						<DateTimePicker
							value={selectedTime}
							mode='time'
							onChange={handleTimeChange}
							minuteInterval={15}
						/>
					</View>

					<View
						style={[
							form.container,
							{ width: '45%', alignItems: 'left' },
						]}
					>
						<Text style={form.label}>Weekend Ends</Text>
						<DateTimePicker
							value={selectedTime}
							mode='time'
							onChange={handleTimeChange}
							minuteInterval={15}
						/>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const local = StyleSheet.create({});

export default AddLocationPage;
