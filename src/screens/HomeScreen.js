import React from "react";
import { ScrollView, View, Text, Image, SafeAreaView } from "react-native";
import { commonStyles } from "../styles/common";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={[commonStyles.container, { flex: 1, paddingTop: 48 }]}>
          <Image
            source={require("../../assets/icon.png")}
            style={{ width: 72, height: 48 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
