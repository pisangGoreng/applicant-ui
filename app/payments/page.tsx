import { columns, Applicants } from "./columns";
import { DataTable } from "./data-table";

export default async function DemoPage() {
  const res = await fetch(`http://localhost:3001/applicants`);
  const parsedRes = await res.json();

  const applicantStatus = await fetch(
    `http://localhost:3001/applicants-status`
  );
  const parsedApplicantStatus = await applicantStatus.json();

  const applicantRole = await fetch(`http://localhost:3001/applicants-role`);
  const parsedApplicantRole = await applicantRole.json();

  return (
    <div className="container mx-auto py-10 grid grid-cols-3 gap-4">
      <div className="col-span-2 shadow-lg p-4">
        <DataTable
          columns={columns}
          data={parsedRes.data.data}
          applicantStatus={parsedApplicantStatus.data}
          applicantRole={parsedApplicantRole.data}
        />
      </div>

      <div className="shadow-lg p-4">kucing</div>
    </div>
  );
}
