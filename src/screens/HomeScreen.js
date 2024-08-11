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
import Icon from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  addMultipleItemsToCart,
} from "../features/cart/cartSlice";
import {
  selectServices,
  selectPackages,
} from "../features/storeData/storeDataSlice";

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

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const services = useSelector(selectServices);
  const packages = useSelector(selectPackages);

  const handleServicePress = (service) => {
    dispatch(addItemToCart(service));
    navigation.navigate("Details", { serviceId: service.id });
  };

  const handlePackagePress = (pkg) => {
    const packageServices = pkg.servicesIncluded.map((serviceId) =>
      services.find((service) => service.id === serviceId)
    );
    dispatch(addMultipleItemsToCart(packageServices));
    navigation.navigate("Details", { packageId: pkg.id });
  };

  const getImageForService = (imageName) => {
    return imageMap[imageName] || require("../../assets/icon.png");
  };

  const getImageForPackage = (pkg) => {
    const randomIndex = Math.floor(Math.random() * pkg.servicesIncluded.length);
    const serviceId = pkg.servicesIncluded[randomIndex];
    const serviceImage = services.find(
      (service) => service.id === serviceId
    )?.image;
    return getImageForService(serviceImage);
  };

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

        {/* Services Section */}
        <View style={{ marginTop: 16, paddingHorizontal: 16 }}>
          <Text style={{ fontSize: 18, marginBottom: 8 }}>Services</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {services.map((service) => (
              <Pressable
                key={service.id}
                onPress={() => handleServicePress(service)}
                style={{
                  width: "48%",
                  margin: "1%",
                  height: 150,
                  backgroundColor: "lightgray",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 8,
                }}
              >
                <Image
                  source={getImageForService(service.image)}
                  style={{
                    width: "100%",
                    height: "60%",
                    borderRadius: 8,
                  }}
                  resizeMode="cover"
                />
                <Text>{service.name}</Text>
                <Text>${service.price}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Packages Section */}
        <View style={{ marginTop: 16, paddingHorizontal: 16 }}>
          <Text style={{ fontSize: 18, marginBottom: 8 }}>Packages</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {packages.map((pkg) => (
              <Pressable
                key={pkg.id}
                onPress={() => handlePackagePress(pkg)}
                style={{
                  width: "48%",
                  margin: "1%",
                  height: 150,
                  backgroundColor: "lightgray",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 8,
                }}
              >
                <Image
                  source={getImageForPackage(pkg)}
                  style={{
                    width: "100%",
                    height: "60%",
                    borderRadius: 8,
                  }}
                  resizeMode="cover"
                />
                <Text>{pkg.name}</Text>
                <Text>${pkg.price}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
