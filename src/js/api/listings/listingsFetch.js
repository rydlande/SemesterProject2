import { apiPath } from '../constants.js';
import { card } from './listingsCard.js';

const container = document.querySelector('#container');
const perPage = 30;
let startIndex = 0;

/**
 * Fetches posts from the specified URL and renders them as cards on the page.
 * @async
 * @function listings
 * @param {string} apiPath - The URL to fetch the posts from.
 * @returns {Promise<void>}
 */

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
