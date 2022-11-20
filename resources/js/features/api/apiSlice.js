import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";

// customize basequery and request sender with axios
const axiosBaseQuery =
    ({ baseUrl } = { baseUrl: "" }) =>
    async ({ url, method, data, headers, params }) => {
        try {
            const result = await axios({
                url: baseUrl + url,
                method,
                data,
                headers,
                params,
            });

            return { data: result.data };
        } catch (axiosError) {
            let err = axiosError;
            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data || err.message,
                },
            };
        }
    };

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: axiosBaseQuery({
        baseUrl: import.meta.env.VITE_APP_URL,
    }),
    tagTypes: ["AuthUser", "AuthCategory", "AuthProduct"],
    endpoints: (builder) => ({
        /**
         * no need auth api
         */

        // all categories api
        getAllCategories: builder.query({
            query: () => ({
                url: "/api/all-categories",
                method: "get",
            }),
            providesTags: ["AuthCategory"],
        }),

        // get auth user from web guard
        getAuthUser: builder.query({
            query: () => ({
                url: "/auth/user?needApiToken=true",
                method: "get",
            }),
            providesTags: ["AuthUser"],
        }),

        /**
         * authenticated api
         */

        // auth user profile and password
        updateAuthPassword: builder.mutation({
            query: (formData) => ({
                url: "/api/auth/update-password",
                method: "post",
                data: { ...formData.data, _method: "put" },
                headers: {
                    Authorization: `Bearer ${formData.token}`,
                },
            }),
        }),
        updateAuthProfile: builder.mutation({
            query: (formData) => ({
                url: "/api/auth/update-profile",
                method: "post",
                data: { ...formData.data, _method: "put" },
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${formData.token}`,
                },
            }),
            invalidatesTags: ["AuthUser"],
        }),

        // auth user logout
        authLogout: builder.mutation({
            query: (token) => ({
                url: "/api/auth/logout",
                method: "post",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            invalidatesTags: ["AuthUser"],
        }),

        // authenticated category api
        authGetCategories: builder.query({
            query: (arg) => ({
                url: `/api/auth/categories?paginate=10&page=${arg.page}`,
                method: "get",
                headers: {
                    Authorization: `Bearer ${arg.token}`,
                },
            }),
            providesTags: (result = [], error, arg) => [
                "AuthCategory",
                ...result.data.map(({ id }) => ({ type: "AuthCategory", id })),
            ],
        }),
        authGetCategory: builder.query({
            query: (arg) => ({
                url: `/api/auth/categories/${arg.id}`,
                method: "get",
                headers: {
                    Authorization: `Bearer ${arg.token}`,
                },
            }),
            providesTags: (result, error, arg) => [
                { type: "AuthCategory", id: arg.id },
            ],
        }),
        authCreateCategory: builder.mutation({
            query: (formData) => ({
                url: "/api/auth/categories",
                method: "post",
                data: formData.data,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${formData.token}`,
                },
            }),
            invalidatesTags: ["AuthCategory"],
        }),
        authUpdateCategory: builder.mutation({
            query: (formData) => ({
                url: `/api/auth/categories/${formData.id}`,
                method: "post",
                data: { ...formData.data, _method: "put" },
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${formData.token}`,
                },
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "AuthCategory", id: arg.id },
            ],
        }),

        // authenticated products api
        authGetProducts: builder.query({
            query: (arg) => ({
                url: `/api/auth/products?paginate=10&page=${arg.page}`,
                method: "get",
                headers: {
                    Authorization: `Bearer ${arg.token}`,
                },
            }),
            providesTags: (result = [], error, arg) => [
                "AuthProduct",
                ...result.data.map(({ id }) => ({ type: "AuthProduct", id })),
            ],
        }),

        authGetProduct: builder.query({
            query: (arg) => ({
                url: `/api/auth/products/${arg.id}`,
                method: "get",
                headers: {
                    Authorization: `Bearer ${arg.token}`,
                },
            }),
            providesTags: (result, error, arg) => [
                { type: "AuthProduct", id: arg.id },
            ],
        }),

        // product create request
        authStoreProduct: builder.mutation({
            query: (formData) => ({
                url: "/api/auth/products",
                method: "post",
                data: formData.data,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${formData.token}`,
                },
            }),
            invalidatesTags: ["AuthProduct"],
        }),
        authUpdateProduct: builder.mutation({
            query: (formData) => ({
                url: `/api/auth/products/${formData.id}`,
                method: "post",
                data: formData.data,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${formData.token}`,
                },
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "AuthProduct", id: arg.id },
            ],
        }),
    }),
});

export const {
    useGetAllCategoriesQuery,
    useGetAuthUserQuery,
    useUpdateAuthProfileMutation,
    useUpdateAuthPasswordMutation,
    useAuthLogoutMutation,
    useAuthGetCategoriesQuery,
    useAuthGetCategoryQuery,
    useAuthCreateCategoryMutation,
    useAuthUpdateCategoryMutation,
    useAuthGetProductsQuery,
    useAuthGetProductQuery,
    useAuthStoreProductMutation,
    useAuthUpdateProductMutation,
} = apiSlice;
