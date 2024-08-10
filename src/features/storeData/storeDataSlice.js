import { createSlice } from "@reduxjs/toolkit";
import servicesData from "../../../data/services.json";
import packagesData from "../../../data/packages.json";
const initialState = {
  services: servicesData.services,
  packages: packagesData.packages,
};

const storeDataSlice = createSlice({
  name: "storeData",
  initialState,
  reducers: {},
});

export const selectServices = (state) => state.storeData.services;
export const selectPackages = (state) => state.storeData.packages;

export default storeDataSlice.reducer;
