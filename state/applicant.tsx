import { NEXT_PUBLIC_API_BASE_URL } from "@/app/constants/api";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type ApiResponseType<T> = {
  success: boolean;
  message: string;
  data?: T;
  error?: any;
};

export type ApiResponsePaginationType = {
  success: boolean;
  message: string;
  data: {
    data?: ApplicantsType[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
  };
  error?: any;
};

export type ApplicantsType = {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  yoe: number;
  location: string;
  resumeLink: string;
  createdAt: Date;
  updatedAt: Date;
  applicantRoleId: number;
  applicantStatusId: number;
  applicantRole: ApplicantRoleAndStatusType;
  applicantStatus: ApplicantRoleAndStatusType;
};

export type ApplicantRoleAndStatusType = {
  id: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

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
