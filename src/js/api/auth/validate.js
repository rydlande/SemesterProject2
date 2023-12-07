import { apiPath } from "../constants.js";
export async function validateUser() {
  let token = localStorage.getItem("token");
  const res = await fetch(apiPath, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
}
validateUser();
