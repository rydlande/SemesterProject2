import { apiPath } from '../constants.js';
const clear = document.querySelector('#openRegisterModal');
const button = document.querySelector('#registerButton');
const name = document.querySelector('#registerUsername');
const email = document.querySelector('#registerEmail');
const password = document.querySelector('#registerPassword1');
const password2 = document.querySelector('#registerPassword2');
const response = document.querySelector('#registerResponse');

function clearInputFields() {
  name.value = '';
  email.value = '';
  password.value = '';
  password2.value = '';
}

clear.addEventListener('click', (e) => {
  clearInputFields();
});

button.addEventListener('click', (e) => {
  e.preventDefault();
  register();
});

async function register() {
  response.innerText = '';

  let user = {
    name: name.value,
    email: email.value,
    password: password.value,
  };

  const res = await fetch(apiPath + '/auction/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
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
    } else {
      response.innerHTML = `Something went wrong. Please try again. </br>(Error: ${errorRes.errors[0].message})`;
      console.log(`${errorRes.status}`);
    }
  } else if (password.value !== password2.value) {
    response.innerText = `Password does not match`;
  } else {
    const data = await res.json();
    console.log(data);
  }
}
