import { URL } from '../api/constants.js';
const clear = document.querySelector('#openRegisterModal');
const button = document.querySelector('#registerButton');
const username = document.querySelector('#registerUsername');
const email = document.querySelector('#registerEmail');
const password = document.querySelector('#registerPassword1');
const response = document.querySelector('#registerResponse');

function clearInputFields() {
  username.value = '';
  email.value = '';
  password.value = '';
}

clear.addEventListener('click', (e) => {
  e.preventDefault();
  clearInputFields();
});

button.addEventListener('click', (e) => {
  e.preventDefault();
  register();
});

async function register() {
  response.innerText = '';

  let user = {
    name: username.value,
    email: email.value,
    password: password.value,
  };

  const res = await fetch(URL + '/auction/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
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
    } else {
      response.innerHTML = `Something went wrong. Please try again. </br>(Error: ${errorRes.errors[0].message})`;
    }
  } else {
    await res.json();
    response.style.color = 'green';
    response.style.fontStyle = 'normal';
    response.innerText = `User created successfully. Please log in!`;
  }
}
