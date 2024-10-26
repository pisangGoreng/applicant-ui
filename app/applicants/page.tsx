"use client";

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { useAppSelector } from "@/app/redux";
import ApplicantDetailsCard from "./components/ApplicantDetailsCard";
import {
  useGetApplicantsQuery,
  useGetApplicantsRoleQuery,
  useGetApplicantsStatusQuery,
} from "@/state/applicant";
import LoadingSpinner from "@/components/LoadingSpinner";
import AddApplicantForm from "./components/AddApplicantForm";

export default function ApplicanstPages() {
  const selectedApplicant = useAppSelector(
    ({ applicant }) => applicant.selectedApplicant
  );

  const { data: applicants, isLoading: isLoadingApplicants } =
    useGetApplicantsQuery({});

  const { data: applicantsStatus, isLoading: isLoadingApplicantsStatus } =
    useGetApplicantsStatusQuery({});

  const { data: applicantsRole, isLoading: isLoadingApplicantsRole } =
    useGetApplicantsRoleQuery({});

  if (
    isLoadingApplicants ||
    isLoadingApplicantsStatus ||
    isLoadingApplicantsRole
  ) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto ">
      <div className="py-3 flex flex-row justify-between items-center px-4">
        <h1>Applicants</h1>

        <AddApplicantForm />
      </div>

      <div className="py-3 grid grid-cols-3 gap-4 ">
        <div className="col-span-2 shadow-lg p-4 min-h-screen">
          {applicants && applicantsStatus && applicantsRole && (
            <DataTable
              columns={columns}
              data={applicants}
              applicantStatus={
                Array.isArray(applicantsStatus) ? applicantsStatus : []
              }
              applicantRole={
                Array.isArray(applicantsRole) ? applicantsRole : []
              }
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
    </div>
  );
}
