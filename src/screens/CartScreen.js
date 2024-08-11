import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import moment from 'moment';

const CartScreen = ({ route, navigation }) => {
  const { selectedDate, selectedTime, selectedServices } = route.params;

  const renderServiceItem = ({ item }) => (
    <View style={styles.serviceItem}>
      <Text style={styles.serviceName}>{item.name}</Text>
      <Text style={styles.serviceDescription}>{item.description}</Text>
      <Text style={styles.servicePrice}>{item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>
      {selectedServices && selectedServices.length > 0 ? (
        <FlatList
          data={selectedServices}
          renderItem={renderServiceItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text style={styles.noServicesText}>No services selected.</Text>
      )}
      <View style={styles.appointmentInfo}>
        <Text>Appointment Date: {moment(selectedDate).format('MMMM D, YYYY')}</Text>
        <Text>Appointment Time: {moment(selectedTime).format('h:mm A')}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Submit Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  noServicesText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  serviceItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  appointmentInfo: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
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

export default CartScreen;
