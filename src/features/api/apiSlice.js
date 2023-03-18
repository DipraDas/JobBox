import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({}),
    endpoints: (builder) => ({})
})