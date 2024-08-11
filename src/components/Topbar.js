import React from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import commonStyles from "../styles/common";
import { useSelector } from "react-redux";
import { selectReservations } from "../features/reservation/reservationSlice";

const TopBar = ({ navigation }) => {
  const reservations = useSelector(selectReservations);
  const handleAvatarPress = () => {
    navigation.navigate("Reservations");
  };

  return (
    <View style={[commonStyles.topBar, { paddingTop: 48 }]}>
      <Image
        source={require("../../assets/icon.png")}
        style={commonStyles.logo}
      />

      <TouchableOpacity
        onPress={handleAvatarPress}
        style={styles.avatarContainer}
      >
        <Icon name="receipt" size={30} color="black" />
        {reservations.length > 0 && (
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{reservations.length}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    marginLeft: "auto",
    marginRight: 20,
    position: "relative",
  },
  badgeContainer: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default TopBar;
