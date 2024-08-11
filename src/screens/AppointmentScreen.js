import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import appointmentStyles from "../styles/appointment";
import { useDispatch } from "react-redux";
import { clearAppointment, setAppointment } from "../features/appointment/appointmentSlice";

const AppointmentScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const today = new Date(); 

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const showTimePicker = () => setTimePickerVisibility(true);
  const hideTimePicker = () => setTimePickerVisibility(false);

  const handleDateConfirm = (date) => {
    const dayOfWeek = date.getDay(); 

    if (date < today) {
      Alert.alert(
        "Invalid Date",
        "Please select a date that is today or in the future.",
        [
          {
            text: "OK",
            onPress: () => {
              hideDatePicker();
              showDatePicker();
            },
          },
        ]
      );
    } else if (dayOfWeek === 0 || dayOfWeek === 6) { 
      Alert.alert(
        "Invalid Date",
        "Please select a date that is not a weekend.",
        [
          {
            text: "OK",
            onPress: () => {
              hideDatePicker();
              showDatePicker();
            },
          },
        ]
      );
    } else {
      setSelectedDate(date);
      hideDatePicker();
      showTimePicker();
    }
  };

  const handleTimeConfirm = (time) => {
    const hour = time.getHours();
    if (hour >= 10 && hour <= 16) {
      setSelectedTime(time);
      hideTimePicker();
    } else {
      Alert.alert(
        "Invalid Time",
        "Please select a time between 10 AM and 4 PM.",
        [
          {
            text: "OK",
            onPress: () => {
              hideTimePicker();
              showTimePicker();
            },
          },
        ]
      );
    }
  };

  const formatDate = (date) =>
    date ? moment(date).format("MMMM D, YYYY") : "Select Date";
  const formatTime = (time) =>
    time ? moment(time).format("h:mm A") : "Select Time";

  const handleNext = () => {
    if (selectedDate && selectedTime) {
      const setAppointment = (date, time) => {
        return {
          type: "appointment/setAppointment",
          payload: {
            date: date.toISOString(),
            time: time.toISOString(),
          },
        };
      };

      dispatch(setAppointment(selectedDate, selectedTime));

      navigation.navigate("Cart");
    } else {
      Alert.alert(
        "Incomplete Information",
        "Please select both date and time."
      );
    }
  };

  const handlePrevious = () => {
    navigation.navigate("Details");
    dispatch(clearAppointment());
  };

  return (
    <View style={appointmentStyles.container}>
      <View style={appointmentStyles.header}>
        <Text style={appointmentStyles.headerText}>
          Select Your Appointment
        </Text>
      </View>
      <View style={appointmentStyles.content}>
        <TouchableOpacity
          style={appointmentStyles.input}
          onPress={showDatePicker}
        >
          <Text style={appointmentStyles.inputText}>
            {formatDate(selectedDate)}
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          minimumDate={today} 
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
        />
        <TouchableOpacity
          style={appointmentStyles.input}
          onPress={showTimePicker}
        >
          <Text style={appointmentStyles.inputText}>
            {formatTime(selectedTime)}
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleTimeConfirm}
          onCancel={hideTimePicker}
        />
      </View>
      <View style={appointmentStyles.buttonContainer}>
        <TouchableOpacity
          style={appointmentStyles.button}
          onPress={handlePrevious}
        >
          <Text style={appointmentStyles.buttonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={appointmentStyles.button} onPress={handleNext}>
          <Text style={appointmentStyles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AppointmentScreen;
