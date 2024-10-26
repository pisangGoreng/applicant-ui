"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Applicants = {
  name: string;
  email: string;
  applicantRole: {
    id: string;
    description: string;
  };
  applicantStatus: {
    id: string;
    description: string;
  };
};

export const columns: ColumnDef<Applicants>[] = [
  {
    accessorKey: "name",
    header: "Candidate Name",
  },
  {
    accessorKey: "email",
    header: "Candidate Email",
  },
  {
    accessorKey: "applicantRole",
    header: "Applied Role",
    accessorFn: (row) => row.applicantRole.description,
  },
  {
    accessorKey: "applicantStatus",
    header: "Application Status",
    accessorFn: (row) => row.applicantStatus.description,
  },
];
