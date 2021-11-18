import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//https://rapidapi.com/microsoft-azure-org-microsoft-cognitive-services/api/bing-news-search1/

const cryptoApiHeaders = {
  "x-rapidapi-host": process.env.REACT_APP_xrapidapihost,
  "x-rapidapi-key": process.env.REACT_APP_xrapidapikey,
};

const baseUrl = "https://coinranking1.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timePeriod }) =>
        createRequest(`/coin/${coinId}/history/${timePeriod}`),
    }),
    getExchanges: builder.query({
      query: () => createRequest("/exchanges"),
    }),
  }),
});

//tiene que coincidir el nombre con el query que queremos exportar. No importa que aca la G sea mayuscula
export const { useGetCryptosQuery } = cryptoApi;
export const { useGetCryptoDetailsQuery } = cryptoApi;
export const { useGetCryptoHistoryQuery } = cryptoApi;
export const { useGetExchangesQuery } = cryptoApi;

//basicamente lo que esta haciendo cryptoApi segun entiendo
// const fetchData = async () => {
//   const data = await axios.get(
//     "https://coinranking1.p.rapidapi.com/exchanges",
//     {
//       headers: {
//         "x-rapidapi-host": "coinranking1.p.rapidapi.com",
//         "x-rapidapi-key": "298084ab0fmshbd36aeba70d18a3p19ef04jsn685ee69cb6f8",
//       },
//     }
//   );
//   console.log(data);
// };

// useEffect(() => {
//   fetchData();
// }, []);
