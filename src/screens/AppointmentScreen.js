import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Alert } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

const AppointmentScreen = ({ navigation }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const showTimePicker = () => setTimePickerVisibility(true);
  const hideTimePicker = () => setTimePickerVisibility(false);

  const handleDateConfirm = (date) => {
    if (date.getDay() !== 0 && date.getDay() !== 6) { // Exclude weekends
      setSelectedDate(date);
      hideDatePicker();
      showTimePicker(); // Automatically show time picker after selecting date
    } else {
      Alert.alert('Invalid Date', 'Please select a date that is not a weekend.');
    }
  };

  const handleTimeConfirm = (time) => {
    const hour = time.getHours();
    if (hour >= 10 && hour <= 16) { // Time between 10 AM and 4 PM
      setSelectedTime(time);
      hideTimePicker();
    } else {
      Alert.alert('Invalid Time', 'Please select a time between 10 AM and 4 PM.');
    }
  };

  const formatDate = (date) => date ? moment(date).format('MMMM D, YYYY') : 'Select Date';
  const formatTime = (time) => time ? moment(time).format('h:mm A') : 'Select Time';

  const handleNext = () => {
    if (selectedDate && selectedTime) {
      // Navigate to the next screen (adjust as needed)
      navigation.navigate('Cart');
    } else {
      Alert.alert('Incomplete Information', 'Please select both date and time.');
    }
  };

  const handlePrevious = () => {
    // Navigate to the previous screen (adjust as needed)
    navigation.navigate('Details');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Select Your Appointment</Text>
      </View>
      <View style={styles.content}>
        <TouchableOpacity style={styles.input} onPress={showDatePicker}>
          <Text style={styles.inputText}>{formatDate(selectedDate)}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
        />
        <TouchableOpacity style={styles.input} onPress={showTimePicker}>
          <Text style={styles.inputText}>{formatTime(selectedTime)}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleTimeConfirm}
          onCancel={hideTimePicker}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handlePrevious}>
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#007bff',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  inputText: {
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AppointmentScreen;
