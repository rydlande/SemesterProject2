import { apiPath } from "../constants.js";
const URL = "https://api.noroff.dev/api/v1";
const button = document.querySelector("#registerButton");
const username = document.querySelector("#registerUsername");
const email = document.querySelector("#registerEmail");
const password1 = document.querySelector("#registerPassword1");
const password2 = document.querySelector("#registerPassword2");
const responsePassword = document.querySelector("#registerResponse");

button.addEventListener("click", (e) => {
  e.preventDefault();
  register();
});

async function register() {
  const user = {
    username: username.value,
    email: email.value,
    password1: password1.value,
    password2: password2.value,
  };
  const res = await fetch(URL + "/auction/auth/register", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await res.json();
}
