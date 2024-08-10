import React from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  SafeAreaView,
  Pressable,
} from "react-native";
import { commonStyles } from "../styles/common";
import Hero from "../components/Hero";
import Icon from "react-native-vector-icons/AntDesign";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={[commonStyles.topBar, { paddingTop: 48 }]}>
          <Image
            source={require("../../assets/icon.png")}
            style={commonStyles.logo}
          />
          <Pressable onPress={() => console.log("pressed ")}>
            <Icon name="enviromento" size={24} color="black" />
          </Pressable>
        </View>
        <Hero />
      </ScrollView>
    </SafeAreaView>
  );
}
