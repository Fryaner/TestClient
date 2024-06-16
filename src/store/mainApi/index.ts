import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const mainApi = createApi({
    reducerPath: 'mainApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000/api/'}),
    endpoints: () => ({})
})

export default mainApi;