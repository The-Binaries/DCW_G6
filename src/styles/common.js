import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
  topBar: {
    padding: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: 124,
    height: 64,
    objectFit: "cover",
  },
});
