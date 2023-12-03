import { apiPath } from "../constants.js";
const URL = "https://api.noroff.dev/api/v1";
const button = document.querySelector("#loginButton");
const email = document.querySelector("#loginEmail");
const password = document.querySelector("#loginPassword");

button.addEventListener("click", (e) => {
  e.preventDefault();
  login();
});
async function login() {
  const user = {
    email: email.value,
    password: password.value,
  };
  const res = await fetch(apiPath + "/auction/auth/login", {
    method: "post",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  console.log(data);
}

/* export async function login(email, password) {
  const res = await fetch(`${apiPath}/auction/authlogin`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: headers("application/json"),
  });

  if (res.ok) {
    const profile = await res.json();
    save("token", profile.accessToken);
    delete profile.accessToken;
    save("profile", profile);
    return profile;
  }
  throw new Error(res.statusText);
} */
