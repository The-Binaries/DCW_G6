import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const services = [
  {
    name: 'Exterior Hand Wash',
    image: require('../../assets/images/exterior_car_washing.jpg'),
    description: 'Thorough washing of the car’s exterior using hand washing techniques.',
    price: '$15',
  },
  {
    name: 'Interior Vacuuming',
    image: require('../../assets/images/interior_vacuuming.jpg'),
    description: 'Vacuuming the seats, carpets, and floor mats to remove dirt and debris.',
    price: '$20',
  },
  {
    name: 'Waxing and Polishing',
    image: require('../../assets/images/waxing_cars.jpeg'),
    description: 'Applying wax and polish to protect and enhance the shine of the car’s paint.',
    price: '$25',
  },
  {
    name: 'Tire and Wheel Cleaning',
    image: require('../../assets/images/wheel_cleaning.jpeg'),
    description: 'Cleaning and shining the tires and wheels.',
    price: '$10',
  },
  {
    name: 'Leather Cleaning and Conditioning',
    image: require('../../assets/images/leather_cleaning.jpeg'),
    description: 'Cleaning and conditioning leather seats and surfaces.',
    price: '$30',
  },
  {
    name: 'Window Cleaning',
    image: require('../../assets/images/window_cleaning.jpeg'),
    description: 'Cleaning the inside and outside of the car windows.',
    price: '$8',
  },
  {
    name: 'Engine Detailing',
    image: require('../../assets/images/engine_detailing.webp'),
    description: 'Cleaning the engine bay to remove dirt, grease, and grime.',
    price: '$50',
  },
  {
    name: 'Headlight Restoration',
    image: require('../../assets/images/headlight_restoration.jpg'),
    description: 'Restoring the clarity of foggy or yellowed headlights.',
    price: '$35',
  },
];

export default function DetailScreen({ navigation }) {
  const [clickedServices, setClickedServices] = useState({});

  const handleServiceClick = (index, service) => {
    if (clickedServices[index]) {
      setClickedServices((prev) => {
        const updatedClickedServices = { ...prev };
        delete updatedClickedServices[index];
        return updatedClickedServices;
      });
    } else {
      setClickedServices((prev) => ({
        ...prev,
        [index]: true,
      }));
    }
  };

  const handleNext = () => {
    const selectedServices = Object.keys(clickedServices).map(index => services[index]);
    navigation.navigate('Appointment', { selectedServices });
  };

  const handlePrevious = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {services.map((service, index) => (
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
