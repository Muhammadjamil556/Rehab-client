import { createApi } from "@reduxjs/toolkit/query/react";
import BaseUrl from "../../../utils/baseurl";

export interface Medicine {
  id: number;
  name: string;
  composition: string;
  uses: string;
  sideEffects: string;
  imageURL: string;
  manufacturer: string;
}

export const medicineApi = createApi({
  reducerPath: "medicineApi",
  baseQuery: BaseUrl,
  endpoints: (builder) => ({
    getMedicineDetails: builder.query<Medicine, string>({
      query: (id) => `/api/v1/all-medicines/${id}`,
    }),
    getAllMedicines: builder.query<Medicine[], void>({
      query: () => "/api/v1/all-medicines",
    }),
  }),
});

export const { useGetMedicineDetailsQuery, useGetAllMedicinesQuery } =
  medicineApi;

export default medicineApi;
