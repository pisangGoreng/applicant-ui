import { NEXT_PUBLIC_API_BASE_URL } from "@/app/constants/api";
import {
  ApiResponsePaginationType,
  ApiResponseType,
  ApplicantRoleAndStatusType,
  ApplicantsType,
} from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const applicantsApi = createApi({
  reducerPath: "applicantsApi",
  tagTypes: ["Applicants", "ApplicantsStatus", "ApplicantsRole"],
  baseQuery: fetchBaseQuery({ baseUrl: `${NEXT_PUBLIC_API_BASE_URL}` }),
  endpoints: (builder) => ({
    getApplicants: builder.query({
      query: () => "/applicants",
      providesTags: ["Applicants"],
      transformResponse: (response: ApiResponsePaginationType) =>
        response.data.data,
    }),
    getApplicantsStatus: builder.query({
      query: () => "/applicants-status",
      providesTags: ["ApplicantsStatus"],
      transformResponse: (
        response: ApiResponseType<ApplicantRoleAndStatusType>
      ) => response.data,
    }),
    getApplicantsRole: builder.query({
      query: () => "/applicants-role",
      providesTags: ["ApplicantsRole"],
      transformResponse: (
        response: ApiResponseType<ApplicantRoleAndStatusType>
      ) => response.data,
    }),

    createNewApplicant: builder.mutation({
      query: (newApplicant) => ({
        url: "/applicants",
        method: "POST",
        body: newApplicant,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Applicants"], // Invalidate cache to refetch data
    }),
  }),
});

export interface initialStateTypes {
  selectedApplicant: null | ApplicantsType;
}

const initialState: initialStateTypes = {
  selectedApplicant: null,
};

export const applicantSlice = createSlice({
  name: "applicant",
  initialState,
  reducers: {
    setSelectedApplicant: (state, action: PayloadAction<ApplicantsType>) => {
      state.selectedApplicant = action.payload;
    },
  },
});

export const { setSelectedApplicant } = applicantSlice.actions;
export const {
  useGetApplicantsQuery,
  useGetApplicantsStatusQuery,
  useGetApplicantsRoleQuery,
  useCreateNewApplicantMutation,
} = applicantsApi;
export default applicantSlice.reducer;
