import { apiPath } from '../api/constants.js';
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
  const res = await fetch(apiPath + '/auction/auth/login', {
    method: 'post',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const errorRes = await res.json();
    console.log(errorRes);
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
      console.log(`${errorRes.status}`);
    }
  } else {
    const data = await res.json();
    localStorage.setItem('token', data.accessToken);
    localStorage.setItem('name', data.name);
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1000);
  }
}

/* const username = document.querySelector('#username');
const name = localStorage.getItem('name');
const pathname = window.location.pathname;

if (pathname === './index.html') {
  if (name) {
    username.textContent = `Hello, ${name}`;
  } else if (name === '') {
    username.textContent = 'Hello, Guest';
  } else if (name === 'undefined') {
    username.textContent = 'Hello, Guest';
  } else {
    username.textContent = 'Hello, Guest';
  }
} else if (pathname === './en_gb/listing/index.html') {
  username.textContent = `Test`;
} */
