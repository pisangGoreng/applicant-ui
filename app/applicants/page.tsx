"use client";

import { useEffect, useState } from "react";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { useAppSelector } from "@/app/redux";
import { NEXT_PUBLIC_API_BASE_URL } from "../constants/api";
import ApplicantDetailsCard from "./components/ApplicantDetailsCard";

export default function DemoPage() {
  const selectedApplicant = useAppSelector(
    ({ applicant }) => applicant.selectedApplicant
  );

  return (
    <div className="container mx-auto py-10 grid grid-cols-3 gap-4">
      <div className="col-span-2 shadow-lg p-4 min-h-screen">
        <DataTableWithData />
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

function DataTableWithData() {
  const [applicantData, setApplicantData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const applicants = await fetch(
          `${NEXT_PUBLIC_API_BASE_URL}/applicants`
        );
        const parsedApplicants = await applicants.json();

        const applicantStatus = await fetch(
          `${NEXT_PUBLIC_API_BASE_URL}/applicants-status`
        );
        const parsedApplicantStatus = await applicantStatus.json();

        const applicantRole = await fetch(
          `http://localhost:3001/applicants-role`
        );
        const parsedApplicantRole = await applicantRole.json();

        setApplicantData({
          applicants: parsedApplicants.data.data,
          applicantStatus: parsedApplicantStatus.data,
          applicantRole: parsedApplicantRole.data,
        });
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  if (!applicantData) {
    return <div>Loading...</div>;
  }

  return (
    <DataTable
      columns={columns}
      data={applicantData.applicants}
      applicantStatus={applicantData.applicantStatus}
      applicantRole={applicantData.applicantRole}
    />
  );
}
