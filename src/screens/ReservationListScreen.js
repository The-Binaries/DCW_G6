import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";
import moment from "moment";
import { selectReservations } from "../features/reservation/reservationSlice";
import reservationStyles from "../styles/reservation";

const ReservationListScreen = () => {
  const reservations = useSelector(selectReservations);

  console.log("Reservations:", reservations);

  const renderReservationItem = ({ item }) => (
    <View style={reservationStyles.reservationItem}>
      <Text style={reservationStyles.reservationDate}>
        Date: {moment(item.date).format("MMMM D, YYYY")}
      </Text>
      <Text style={reservationStyles.reservationTime}>
        Time: {moment(item.time).format("h:mm A")}
      </Text>
      <Text style={reservationStyles.reservationTotal}>
        Total: ${item.totalPrice.toFixed(2)}
      </Text>
      <View style={reservationStyles.servicesContainer}>
        {item.services.map((service, index) => (
          <View key={index} style={reservationStyles.serviceItem}>
            <Text style={reservationStyles.serviceName}>{service.name}</Text>
            <Text style={reservationStyles.serviceDescription}>
              {service.description}
            </Text>
            <Text style={reservationStyles.servicePrice}>${service.price}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <View style={reservationStyles.container}>
      <Text style={reservationStyles.header}>Reservations</Text>
      {reservations && reservations.length > 0 ? (
        <FlatList
          data={reservations}
          renderItem={renderReservationItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text style={reservationStyles.noReservationsText}>
          No reservations made yet.
        </Text>
      )}
    </View>
  );
};

export default ReservationListScreen;
