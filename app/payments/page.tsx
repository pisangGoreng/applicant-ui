import { columns, Applicants } from "./columns";
import { DataTable } from "./data-table";

export default async function DemoPage() {
  const res = await fetch(`http://localhost:3001/applicants`, {
    method: "GET",
  });

  const parsedRes = await res.json();
  // console.log("🚀 ~ parsedRes:", parsedRes.data.data);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={parsedRes.data.data} />
    </div>
  );
}
