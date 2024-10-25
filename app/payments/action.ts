"use server";

// export const fetchApplicants = async () => {
//   const response = await axios.get("/api/data");
// };

export default async function fetchApplicants() {
  const res = await fetch(`http://localhost:3001/applicants`, {
    method: "GET",
  });

  const parsedRes = await res.json();
  console.log("🚀 ~ parsedRes:", parsedRes);
}
