import { URL } from '../api/constants.js';
import { container } from './myAccountCard.js';
/* import { cards } from './myAccountCard.js';
 */

const user = localStorage.getItem('name');
const token = localStorage.getItem('token');
const myAccountSection = document.querySelector('#myAccountSection');
/* const overviewSection = document.querySelector('#overviewSection'); */

async function myAccount() {
  const res = await fetch(
    URL + '/auction/profiles/' + user + '?_listings=true',
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
  document.title = `${data.name} | Arthall`;
  myAccountSection.append(container(data));
}
document.addEventListener('DOMContentLoaded', myAccount);

/* 
fetch funksjon som skulle brukes til egen menu på profil-siden. 
Endpoints som skulle brukes:
  /auction/profiles/<name>/media. Method: PUT
  /auction/profiles/<name>/listings. Method: GET
  /auction/profiles/<name>/bids. Method: GET

Resten av koden ligger nederst i myAccountCard.js

async function myData() {
  const res = await fetch(URL + '/auction/profiles/' + user + '/listings', {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('API request failed');
  }
  const userdata = await res.json();

  userdata.forEach((item) => {
    const cardElement = cards(item);
    overviewSection.append(cardElement);
  });
}
document.addEventListener('DOMContentLoaded', myData); */
