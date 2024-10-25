"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
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
