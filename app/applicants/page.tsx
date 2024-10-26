"use client";

import { useEffect, useState } from "react";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { useAppSelector } from "@/app/redux";
// import { NEXT_PUBLIC_API_BASE_URL } from "../constants/api";
import ApplicantDetailsCard from "./components/ApplicantDetailsCard";
import {
  ApplicantRoleAndStatusType,
  useGetApplicantsQuery,
  useGetApplicantsRoleQuery,
  useGetApplicantsStatusQuery,
} from "@/state/applicant";

export default function DemoPage() {
  const selectedApplicant = useAppSelector(
    ({ applicant }) => applicant.selectedApplicant
  );

  const {
    data: applicants,
    error: errorApplicants,
    isLoading: isLoadingApplicants,
  } = useGetApplicantsQuery({});

  const {
    data: applicantsStatus,
    error: errorApplicantsStatus,
    isLoading: isLoadingApplicantsStatus,
  } = useGetApplicantsStatusQuery({});

  const {
    data: applicantsRole,
    error: errorApplicantsRole,
    isLoading: isLoadingApplicantsRole,
  } = useGetApplicantsRoleQuery({});

  return (
    <div className="container mx-auto py-10 grid grid-cols-3 gap-4">
      <div className="col-span-2 shadow-lg p-4 min-h-screen">
        {/* <DataTableWithData /> */}
        {applicants && applicantsStatus && applicantsRole && (
          <DataTable
            columns={columns}
            data={applicants}
            applicantStatus={
              Array.isArray(applicantsStatus) ? applicantsStatus : []
            }
            applicantRole={Array.isArray(applicantsRole) ? applicantsRole : []}
          />
        )}
      </div>

      <div className="shadow-lg p-4">
        {selectedApplicant ? (
          <ApplicantDetailsCard details={selectedApplicant} />
        ) : (
          <div className="flex min-h-screen items-center justify-center ">
            <p>No Applicant Selected</p>
          </div>
        )}
      </div>
    </div>
  );
}
