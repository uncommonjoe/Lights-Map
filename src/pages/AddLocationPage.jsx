import React, { useEffect, useState } from 'react';
import {
	Text,
	View,
	Image,
	TextInput,
	Dimensions,
	StyleSheet,
	ScrollView,
	SafeAreaView,
	TouchableOpacity,
} from 'react-native';
import CheckBox from '../components/CheckBox';
import SelectDropdown from 'react-native-select-dropdown';

import DateTimePicker from '@react-native-community/datetimepicker';
import { useSelector } from 'react-redux';

import page from '../styles/page.style';
import form from '../styles/form.style';
import button from '../styles/button.style';
import apiCreateLocations from '../functions/CreateLocation';
import apiStoreImage from '../functions/StoreImage';
import convertAddressToLatLng from '../functions/ConvertAddressToLatLng';
import photoSelection from '../functions/HandlePhotoSelection';

const AddLocationPage = () => {
	const districtsList = useSelector((state) => state.districtsList);
	const featuresList = useSelector((state) => state.featuresList);

	const [name, setLocationName] = useState('');
	const [address1, setStreet] = useState('');
	const [city, setCity] = useState('Billings');
	const [state, setState] = useState('MT');
	const [zip, setZip] = useState('59102');
	const [imageObj, setImageObj] = useState(null);
	const [image, setImage] = useState(null);
	const [dateStarts, setDateStarts] = useState(new Date());
	const [dateEnds, setDateEnds] = useState(new Date());
	const [weekDayTimeStarts, setWeekdayTimeStarts] = useState(new Date());
	const [weekDayTimeEnds, setWeekdayTimeEnds] = useState(new Date());
	const [weekEndTimeStarts, setWeekEndTimeStarts] = useState(new Date());
	const [weekEndTimeEnds, setWeekEndTimeEnds] = useState(new Date());
	const [district, setSelectedDistrict] = useState([]);
	const [features, setSelectedFeatures] = useState([]);
	const [disableFeatures, setDisableFeatures] = useState(false);
	const windowWidth = Dimensions.get('window').width;

	const submitForm = async () => {
		const id = Math.floor(Date.now() * Math.random()).toString();

		// Upload image to Storage and return URL
		const imageUrl = await apiStoreImage(imageObj, name);
		setImage(imageUrl);

		// Update address object
		const address = {
			address1,
			city,
			state,
			zip,
		};

		// convert address to lat long
		let geoLoc;
		if (
			address.address1 &&
			address.city &&
			address.city &&
			address.state &&
			address.zip
		) {
			geoLoc = await convertAddressToLatLng(address);
		}

		// create an object with all form data
		const formData = {
			address,
			description: '',
			district,
			features,
			geoLocation: {
				latitude: geoLoc.lat,
				longitude: geoLoc.lng,
			},
			id: id,
			image,
			likes: 0,
			name,
			showTimes: {
				dateStarts,
				dateEnds,
				weekDayTimeStarts,
				weekDayTimeEnds,
				weekEndTimeStarts,
				weekEndTimeEnds,
			},
			created: new Date(),
		};

		console.log(formData);

		//TODO Update redux list

		//submit form data to Firebase
		await apiCreateLocations(formData);

		// TODO: Send back to settings
		console.log('success');
	};

	const photoSelected = async () => {
		const img = await photoSelection();
		setImageObj(img);
	};

	const handleFeatureCheckboxChange = (feature) => {
		const maxFeatures = 2;
		if (features.includes(feature.id)) {
			setSelectedFeatures(features.filter((f) => f !== feature.id));
			setDisableFeatures(false);
		} else if (features.length < maxFeatures + 1) {
			setSelectedFeatures([...features, feature.id]);
			setDisableFeatures(features.length === maxFeatures - 1);
		} else {
			setDisableFeatures(true);
		}
	};

	return (
		<SafeAreaView style={page.container}>
			<ScrollView>
				{/* Location Name */}
				<View style={form.container}>
					<Text style={form.label}>Location Name</Text>
					<TextInput
						placeholder='eg. Smith Family Lights'
						value={name}
						onChangeText={setLocationName}
						style={form.textInput}
					/>
				</View>

				{/* Address */}
				<View style={form.container}>
					<Text style={form.label}>Address</Text>
					<TextInput
						placeholder='eg. 1234 Any Lane'
						value={address1}
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

					{imageObj && (
						<Image
							source={{ uri: imageObj.uri }}
							style={{
								width: windowWidth,
								height: 200,
								marginBottom: 10,
							}}
						/>
					)}

					<TouchableOpacity
						style={button.formButton}
						onPress={() => photoSelected()}
					>
						<Text>{imageObj ? 'Change' : 'Select'} Photo</Text>
					</TouchableOpacity>
				</View>

				<View style={form.container}>
					<Text style={form.label}>Select District</Text>

					<SelectDropdown
						data={districtsList}
						onSelect={(district, index) =>
							setSelectedDistrict(district.id)
						}
						buttonTextAfterSelection={(district) => {
							return district.name; // use the name property
						}}
						rowTextForSelection={(item) => {
							return item.name; // use the name property
						}}
						defaultButtonText={'Select a district'}
						buttonStyle={form.selectDropdown}
						buttonTextStyle={form.selectDropdownText}
					/>
				</View>

				<View style={form.container}>
					<Text style={form.label}>Select Features (up to 2)</Text>
					{featuresList.map((feature, index) => (
						<View key={index} style={form.checkboxContainer}>
							<CheckBox
								checked={features.includes(feature.id)}
								onChange={() =>
									handleFeatureCheckboxChange(feature)
								}
								label={feature.name}
								disabled={
									disableFeatures &&
									!features.includes(feature.id)
								}
							/>
						</View>
					))}
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
							value={dateStarts}
							mode='date'
							onChange={(event, date) => setDateStarts(date)}
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
							value={dateEnds}
							mode='date'
							onChange={(event, date) => setDateEnds(date)}
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
							value={weekDayTimeStarts}
							mode='time'
							onChange={(event, time) =>
								setWeekdayTimeStarts(time)
							}
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
							value={weekDayTimeEnds}
							mode='time'
							onChange={(event, time) => setWeekdayTimeEnds(time)}
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
							value={weekEndTimeStarts}
							mode='time'
							onChange={(event, time) =>
								setWeekEndTimeStarts(time)
							}
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
							value={weekEndTimeEnds}
							mode='time'
							onChange={(event, time) => setWeekEndTimeEnds(time)}
							minuteInterval={15}
						/>
					</View>
				</View>

				<View
					style={{
						marginVertical: 20,
					}}
				>
					<TouchableOpacity
						style={[button.button, button.red]}
						onPress={() => submitForm()}
					>
						<View style={button.button.container}>
							<Text style={button.button.text}>Submit</Text>
						</View>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const local = StyleSheet.create({});

export default AddLocationPage;
