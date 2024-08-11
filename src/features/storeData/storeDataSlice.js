import { createSlice } from "@reduxjs/toolkit";
import servicesData from "../../../data/services.json";
import packagesData from "../../../data/packages.json";

const calculatePackagePrice = (pkg, services) => {
  return pkg.servicesIncluded.reduce((total, serviceId) => {
    const service = services.find((service) => service.id === serviceId);
    return total + (service ? service.price : 0);
  }, 0);
};

const initialState = {
  services: servicesData.services,
  packages: packagesData.packages.map((pkg) => ({
    ...pkg,
    price: calculatePackagePrice(pkg, servicesData.services),
  })),
};

const storeDataSlice = createSlice({
  name: "storeData",
  initialState,
  reducers: {},
});

export const selectServices = (state) => state.storeData.services;
export const selectPackages = (state) => state.storeData.packages;

export default storeDataSlice.reducer;
