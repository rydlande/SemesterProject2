/**
 * Fetches posts from the specified URL and renders them as cards on the page.
 *
 * @async
 * @function
 * @name listings
 * @param {string} apiPath - The URL to fetch the posts from.
 * @returns {Promise<void>} A promise that resolves when the operation is completed.
 *
 * @throws {Error} If the API request fails.
 */

import { apiPath } from '../api/constants.js';
import { card } from './listingsCard.js';

const container = document.querySelector('#container');
const btnMoreListings = document.querySelector('#btnMoreListings');
const perPage = 30;
let startIndex = 0;

async function listings() {
  try {
    const res = await fetch(
      apiPath + '/auction/listings?_bids=true&_active=true',
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
    let slicedData = data.slice(startIndex, startIndex + perPage);
    console.log(slicedData);
    slicedData.forEach((item) => {
      const cardElement = card(item);
      container.append(cardElement);
    });
    btnMoreListings.style.display = data.length > startIndex + perPage;
    btnMoreListings.addEventListener('click', () => {
      startIndex += perPage;
      let slicedData = data.slice(startIndex, startIndex + perPage);
      slicedData.forEach((item) => {
        const cardElement = card(item);
        container.append(cardElement);
      });
      btnMoreListings.style.display = data.length > startIndex + perPage;
      console.log(slicedData);
    });
  } catch (error) {
    container.innerHTML = `
    <div class="flex flex-col mx-4 lg:px-10">
      <p class="mb-2">Oops! Something went wrong. Please try again later.</p>
      <p class="italic text-xs text-gray-500">${error}</p>
    </div>`;
    console.error(error);
  }
}

document.addEventListener('DOMContentLoaded', listings);
