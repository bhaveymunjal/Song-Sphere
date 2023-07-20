import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const options = {
//   method: 'GET',
//   headers: {
//     'X-RapidAPI-Key': '624c562197mshe67d94e2a5f618bp1ef688jsn0670558aad02',
//     'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
//   },
// };

// fetch('https://spotify23.p.rapidapi.com/artists/?id=2w9zwq3AktTeYYMuhMjju8', options)
//   .then((response) => response.json())
//   // eslint-disable-next-line no-console
//   .then((response) => console.log(response))
//   // eslint-disable-next-line no-console
//   .catch((err) => console.error(err));

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
