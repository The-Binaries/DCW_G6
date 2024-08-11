import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import cartStyles from "../styles/cart";
import { addReservation } from "../features/reservation/reservationSlice";
import { clearCart } from "../features/cart/cartSlice";
import { clearAppointment } from "../features/appointment/appointmentSlice";

const CartScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const selectedServices = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const { date: selectedDate, time: selectedTime } = useSelector(
    (state) => state.appointment
  );
  const handleSubmit = () => {
    if (selectedDate && selectedTime && selectedServices.length > 0) {
      const reservation = {
        date: selectedDate,
        time: selectedTime,
        services: selectedServices,
        totalPrice: totalPrice,
      };

      //   console.log("Dispatching reservation:", reservation);

      dispatch(addReservation(reservation));
      dispatch(clearCart());
      dispatch(clearAppointment());
      navigation.navigate("Home");
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
      <Text style={cartStyles.header}>Confirmation Screen</Text>
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
          Appointment Date:{" "}
          {selectedDate ? moment(selectedDate).format("MMMM D, YYYY") : "N/A"}
        </Text>
        <Text>
          Appointment Time:{" "}
          {selectedTime ? moment(selectedTime).format("h:mm A") : "N/A"}
        </Text>
        <Text style={cartStyles.totalPriceText}>
          Grand Total: ${totalPrice.toFixed(2)}
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
