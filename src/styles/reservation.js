import { QueryStatus } from "@reduxjs/toolkit/query";
import { StyleSheet } from "react-native";
const reservationStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  noReservationsText: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
  reservationItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  reservationDate: {
    fontSize: 18,
    fontWeight: "bold",
  },
  reservationTime: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  reservationTotal: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007bff",
    marginVertical: 10,
  },
  servicesContainer: {
    marginTop: 15,
  },
  serviceItem: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 5,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 10,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  serviceDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  servicePrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginTop: 5,
  },
});

export default reservationStyles;
