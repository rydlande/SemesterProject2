import { apiPath } from "../constants.js";
const URL = "https://api.noroff.dev/api/v1";
const button = document.querySelector("#loginButton");
const email = document.querySelector("#loginEmail");
const password = document.querySelector("#loginPassword");
const response = document.querySelector("#loginResponse");

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
  localStorage.setItem("token", data.accessToken);
  localStorage.setItem("name", data.name);
  console.log(data);
  console.log(data.status);
  if (data.status == "Unauthorized") {
    response.innerText = `Email or password is incorrect.`;
  } else if (data.status == "Bad Request") {
    response.innerHTML = `The email you have entered is not linked to an account.`;
  } else if (data.errors) {
    response.innerText = `Something went wrong. Please try again.`;
  } else {
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
  }
}

const username = document.querySelector("#username");
const name = localStorage.getItem("name");

if (name) {
  username.textContent = `Hello, ${name}`;
} else {
  username.textContent = "Hello, Guest";
}
