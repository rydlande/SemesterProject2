import { apiPath } from '../api/constants.js';
import { container } from './myAccountCard.js';

const user = localStorage.getItem('name');
const token = localStorage.getItem('token');
const main = document.querySelector('main');

console.log(user);

async function myAccount() {
  const res = await fetch(
    apiPath + '/auction/profiles/' + user + '?_listings=true',
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) {
    throw new Error('API request failed');
  }
  const data = await res.json();
  console.log(data);
  document.title = `${data.name} | Arthall`;
  main.append(container(data));
}
document.addEventListener('DOMContentLoaded', myAccount);
