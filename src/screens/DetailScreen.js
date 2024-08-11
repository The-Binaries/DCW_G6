import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import servicesData from '../services.json';

export default function DetailScreen({ navigation }) {
  const [clickedServices, setClickedServices] = useState({});

  const handleServiceClick = (index, service) => {
    if (clickedServices[index]) {
      console.log('Deselected Service:', service);
      setClickedServices((prev) => {
        const updatedClickedServices = { ...prev };
        delete updatedClickedServices[index];
        return updatedClickedServices;
      });
    } else {
      console.log('Selected Service:', service);
      setClickedServices((prev) => ({
        ...prev,
        [index]: true,
      }));
    }
  };

  const handleNext = () => {
    // Navigate to the next screen (adjust as needed)
    navigation.navigate('Appointment');
  };

  const handlePrevious = () => {
    // Navigate to the previous screen (adjust as needed)
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {servicesData.services.map((service, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, clickedServices[index] && styles.selectedCard]}
            onPress={() => handleServiceClick(index, service)}
          >
            <Image source={service.image} style={styles.image} />
            <Text style={styles.name}>{service.name}</Text>
            <Text style={styles.description}>{service.description}</Text>
            <Text style={styles.price}>{service.price}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  selectedCard: {
    backgroundColor: '#c8e6c9',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
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
