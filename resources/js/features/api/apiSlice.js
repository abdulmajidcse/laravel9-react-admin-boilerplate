import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_APP_URL }),
    tagTypes: ["authUser"],
    endpoints: (builder) => ({
        getAuthUser: builder.query({
            query: () => "/auth/user?needApiToken=true",
            providesTags: ["authUser"],
        }),
        updateAuthProfile: builder.mutation({
            query: (data) => ({
                url: "/api/auth/update-profile",
                method: "PUT",
                body: data,
                headers: {
                    Authorization: `Bearer ${data.token}`,
                },
            }),
            invalidatesTags: ["authUser"],
        }),
        authLogout: builder.mutation({
            query: (token) => ({
                url: "/api/auth/logout",
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            invalidatesTags: ["authUser"],
        }),
    }),
});

export const { useGetAuthUserQuery, useUpdateAuthProfileMutation, useAuthLogoutMutation } = apiSlice;
