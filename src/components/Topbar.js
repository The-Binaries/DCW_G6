import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import commonStyles from "../styles/common";

const TopBar = ({ navigation }) => {
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
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    marginLeft: "auto",
    marginRight: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "black",
  },
});

export default TopBar;
