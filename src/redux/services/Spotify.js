import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const SpotifyAPI = createApi({
  reducerPath: 'SpotifyAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
    prepareHeaders: (headers) => {
      // eslint-disable-next-line no-undef
      headers.set('X-RapidAPI-Key', '39a64bc971msh3742f5ced0d9abbp128c75jsnbea68549e32f');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => 'charts/country?country_code=IN' }),
  }),
});

export const {
  useGetTopChartsQuery,
} = SpotifyAPI;
