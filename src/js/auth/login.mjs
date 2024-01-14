import { URL } from '../api/constants.js';
const button = document.querySelector('#loginButton');
const email = document.querySelector('#loginEmail');
const password = document.querySelector('#loginPassword');
const response = document.querySelector('#loginResponse');

button.addEventListener('click', (e) => {
  e.preventDefault();
  login();
});

async function login() {
  const user = {
    email: email.value,
    password: password.value,
  };
  const res = await fetch(URL + '/auction/auth/login', {
    method: 'post',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const errorRes = await res.json();
    if (
      errorRes.errors[0].message ===
      'Only noroff.no emails are allowed to register'
    ) {
      response.innerText = `Only noroff.no or stud.noroff.no emails are allowed to register`;
    } else if (errorRes.status === 'Bad Request') {
      const errorMessage = errorRes.errors[0].message;
      response.innerText = `${errorMessage}`;
    } else if (errorRes.status === 'Unauthorized') {
      const errorMessage = errorRes.errors[0].message;
      response.innerText = `${errorMessage}`;
    } else {
      response.innerHTML = `Something went wrong. Please try again. </br>(Error: ${errorRes.errors[0].message})`;
    }
  } else {
    const data = await res.json();
    localStorage.setItem('token', data.accessToken);
    localStorage.setItem('name', data.name);
    localStorage.setItem('credits', data.credits);
    setTimeout(() => {
      location.reload();
    }, 1000);
  }
}
