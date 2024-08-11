import React from "react";
import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import cartStyles from "../styles/cart";
import moment from "moment";
import { useDispatch } from "react-redux";
import { addReservation } from "../store/reservationSlice"; // Adjust the import path

const CartScreen = ({ route, navigation }) => {
  const { selectedDate, selectedTime, selectedServices } = route.params;
  const dispatch = useDispatch();

  const calculateTotalPrice = () => {
    return selectedServices.reduce((total, service) => {
      const price = parseFloat(service.price.replace("$", ""));
      return total + price;
    }, 0);
  };

  const handleSubmit = () => {
    if (selectedDate && selectedTime && selectedServices.length > 0) {
      const reservation = {
        date: selectedDate,
        time: selectedTime,
        services: selectedServices,
        totalPrice: calculateTotalPrice(),
      };

      dispatch(addReservation(reservation));
      navigation.navigate("ReservationList");
    } else {
      Alert.alert(
        "Incomplete Information",
        "Please make sure all information is complete before submitting."
      );
    }
  };

  const renderServiceItem = ({ item }) => (
    <View style={cartStyles.serviceItem}>
      <Text style={cartStyles.serviceName}>{item.name}</Text>
      <Text style={cartStyles.serviceDescription}>{item.description}</Text>
      <Text style={cartStyles.servicePrice}>{item.price}</Text>
    </View>
  );

  return (
    <View style={cartStyles.container}>
      <Text style={cartStyles.header}>Your Cart</Text>
      {selectedServices && selectedServices.length > 0 ? (
        <FlatList
          data={selectedServices}
          renderItem={renderServiceItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text style={cartStyles.noServicesText}>No services selected.</Text>
      )}
      <View style={cartStyles.appointmentInfo}>
        <Text>
          Appointment Date: {moment(selectedDate).format("MMMM D, YYYY")}
        </Text>
        <Text>Appointment Time: {moment(selectedTime).format("h:mm A")}</Text>
        <Text style={cartStyles.totalPriceText}>
          Grand Total: ${calculateTotalPrice().toFixed(2)}
        </Text>
      </View>
      <View style={cartStyles.buttonContainer}>
        <TouchableOpacity
          style={cartStyles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={cartStyles.buttonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={cartStyles.button} onPress={handleSubmit}>
          <Text style={cartStyles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;
