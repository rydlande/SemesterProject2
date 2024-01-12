const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get('id');

import { apiPath } from '../api/constants.js';
import { container } from './singleCard.js';

const main = document.querySelector('main');

async function listing() {
  try {
    const res = await fetch(
      apiPath + '/auction/listings/' + id + '?_seller=true&_bids=true',
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!res.ok) {
      throw new Error('API request failed');
    }

    const data = await res.json();
    document.title = `${data.title} | Arthall`;
    main.append(container(data));
  } catch (error) {
    container.innerHTML = `
  <div class="flex flex-col mx-4 lg:px-10">
    <p class="mb-2">Oops! Something went wrong. Please try again later.</p>
    <p class="italic text-xs text-gray-500">${error}</p>
  </div>`;
    console.error(error);
  }
}

document.addEventListener('DOMContentLoaded', listing);
