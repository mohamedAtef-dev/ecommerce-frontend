// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export interface Product {
  id: number;
  documentId: string;
  productTitle: string;
  productPrice: number;
  productDescription: string;
  category?: string;
  productRating?: number;
  productImg: Array<{
    id: number;
    url: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
    };
  }>;
}

// هذه هي الواجهة التي تصف الـ Response القادم من Strapi
export interface StrapiResponse {
  data: Product[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
// Define a service using a base URL and expected endpoints
export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BASE_URL}/api/` }),
  endpoints: (builder) => ({
    getproductByName: builder.query<StrapiResponse, string>({
      query: (name) => `${name}`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetproductByNameQuery } = productApi