import { apiPath } from "../constants.js";
const URL = "https://api.noroff.dev/api/v1";
const button = document.querySelector("#registerButton");
const name = document.querySelector("#registerUsername");
const email = document.querySelector("#registerEmail");
const password = document.querySelector("#registerPassword1");
const password2 = document.querySelector("#registerPassword2");
const response = document.querySelector("#registerResponse");

button.addEventListener("click", (e) => {
  e.preventDefault();
  register();
});
async function register() {
  response.innerText = "";

  let user = {
    name: name.value,
    email: email.value,
    password: password.value,
  };

  const validNameRegex = /^[a-zA-Z0-9_]+$/;
  const validEmailRegex =
    /^(?:[a-zA-Z0-9._%+-]+@stud\.noroff\.no)|(?:[a-zA-Z0-9._%+-]+@noroff\.no)$/;

  if (user.name.trim() === "") {
    response.innerText = "Username is required";
  } else if (user.email.trim() === "") {
    response.innerText = "Email is required";
  } else if (user.password === "") {
    response.innerText = "Password is required";
  } else if (user.password !== password2.value) {
    response.innerText = "Passwords do not match";
  } else if (!validNameRegex.test(user.name)) {
    response.innerText = "Invalid punctuation symbols in username";
  } else if (!validEmailRegex.test(user.email)) {
    response.innerText = "Invalid email";
  } else if (user.password.length < 8) {
    response.innerText = "Password must be at least 8 characters";
  } else {
    const res = await fetch(apiPath + "/auction/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();
    console.log(data);

    response.innerHTML = `<p class="">${data.status}</p>`;
  }
}
