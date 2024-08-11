import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  clearCart,
  removeItemFromCart,
} from "../features/cart/cartSlice";
import { selectServices } from "../features/storeData/storeDataSlice";
import { selectCartItems } from "../features/cart/cartSlice"; // New selector import
import detailStyles from "../styles/details";

const imageMap = {
  "exterior_car_washing.jpg": require("../../assets/images/exterior_car_washing.jpg"),
  "interior_vacuuming.jpg": require("../../assets/images/interior_vacuuming.jpg"),
  "waxing_cars.jpeg": require("../../assets/images/waxing_cars.jpeg"),
  "wheel_cleaning.jpeg": require("../../assets/images/wheel_cleaning.jpeg"),
  "leather_cleaning.jpeg": require("../../assets/images/leather_cleaning.jpeg"),
  "window_cleaning.jpeg": require("../../assets/images/window_cleaning.jpeg"),
  "engine_detailing.webp": require("../../assets/images/engine_detailing.webp"),
  "headlight_restoration.jpg": require("../../assets/images/headlight_restoration.jpg"),
};

export default function DetailScreen({ navigation }) {
  const dispatch = useDispatch();
  const services = useSelector(selectServices);
  const cartItems = useSelector(selectCartItems);

  const [clickedServices, setClickedServices] = useState({});

  // Initialize clickedServices based on cart items
  useEffect(() => {
    const initialClickedServices = {};
    cartItems.forEach((item) => {
      initialClickedServices[item.id] = true;
    });
    setClickedServices(initialClickedServices);
  }, [cartItems]);

  const handleServiceClick = (service) => {
    if (clickedServices[service.id]) {
      dispatch(removeItemFromCart(service.id)); // Remove from cart
      setClickedServices((prev) => {
        const updatedClickedServices = { ...prev };
        delete updatedClickedServices[service.id];
        return updatedClickedServices;
      });
    } else {
      dispatch(addItemToCart(service)); // Add to cart
      setClickedServices((prev) => ({
        ...prev,
        [service.id]: true,
      }));
    }
  };

  const handleNext = () => {
    navigation.navigate("Appointment");
  };

  const handlePrevious = () => {
    navigation.navigate("Home");
    dispatch(clearCart());
  };

  return (
    <View style={detailStyles.container}>
      <ScrollView style={detailStyles.scrollView}>
        {services.map((service) => (
          <TouchableOpacity
            key={service.id}
            style={[
              detailStyles.card,
              clickedServices[service.id] && detailStyles.selectedCard,
            ]}
            onPress={() => handleServiceClick(service)}
          >
            <Image
              source={imageMap[service.image]}
              style={detailStyles.image}
            />
            <Text style={detailStyles.name}>{service.name}</Text>
            <Text style={detailStyles.description}>{service.description}</Text>
            <Text style={detailStyles.price}>${service.price}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={detailStyles.buttonContainer}>
        <TouchableOpacity style={detailStyles.button} onPress={handlePrevious}>
          <Text style={detailStyles.buttonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={detailStyles.button} onPress={handleNext}>
          <Text style={detailStyles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
