const token = localStorage.getItem('token');
const nameStorage = localStorage.getItem('name');
const credits = localStorage.getItem('credits');

function nav() {
  const header = document.querySelector('header');
  const currentPath = window.location.pathname;

  const loggedIn = document.createElement('nav');
  const userData = document.createElement('a');

  let basePath = './myaccount/index.html';

  if (currentPath.includes('/listing/') || currentPath.includes('/profile/')) {
    basePath = '../myaccount/index.html';
  }

  userData.href = basePath;

  const userName = document.createElement('h3');
  userName.classList.add('userName');
  userName.textContent = nameStorage;

  const userCredit = document.createElement('p');
  userCredit.classList.add('userCredit');
  userCredit.textContent = credits;

  userData.append(userName, userCredit);
  loggedIn.append(userData);

  const loggedOut = document.createElement('nav');
  const arthall = document.createElement('a');
  arthall.classList.add('arthall');
  arthall.textContent = 'Arthall';
  arthall.href = '../index.html';

  loggedOut.appendChild(arthall);

  if (currentPath.includes('/myaccount/index.html')) {
    header.append(loggedOut);
  } else if (!token) {
    header.append(loggedOut);
  } else {
    header.append(loggedIn);
  }
}

document.addEventListener('DOMContentLoaded', nav);
