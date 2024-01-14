import { fetchData, fetchListings } from '../api/getters.js';
import { newCard } from './listingsCard.js';
import { createSelectElement } from './selectComponent.js';

const container = document.querySelector('#container');
const btnMoreListings = document.querySelector('#btnMoreListings');
const perPage = 30;
let startIndex = 0;
let availableTags = [];

export const optionSelected = async (selected) => {
  let data;

  const currentTime = new Date().toISOString();

  if (selected === 'Ending soon') {
    const fourHoursLater = new Date();
    fourHoursLater.setHours(fourHoursLater.getHours() + 4);

    const queryParams = `_active=true&endsAt=${currentTime},${fourHoursLater.toISOString()}&sort=endsAt&sortOrder=asc&_bids=true&_seller=true`;

    data = await fetchData('/auction/listings', queryParams);
    window.sessionStorage.setItem('filterEndpoint', queryParams);
  }

  if (selected === 'Recently listed') {
    const queryParams = '_active=true&_bids=true&_seller=true';

    data = await fetchData('/auction/listings', queryParams);
    window.sessionStorage.setItem('filterEndpoint', queryParams);
  }

  if (selected === 'Expired') {
    const queryParams = `_active=false&endsAt=${currentTime}&sort=endsAt&sortOrder=asc&_bids=true&_seller=true`;

    data = await fetchData('/auction/listings', queryParams);
    window.sessionStorage.setItem('filterEndpoint', queryParams);
  }

  createCards(data);
};

const fetchTagData = async (selectedTag) => {
  if (!availableTags.includes(selectedTag)) {
    return;
  }

  const data = await fetchListings('/auction/listings', selectedTag);
  createCards(data);
};

const flattenArray = (array) => {
  array.forEach((z) => {
    if (!z) {
      return;
    }

    availableTags.push(z);
  });
};

function removeDuplicates(array) {
  return [...new Set(array.sort())];
}

const populateListings = async () => {
  const listings = await fetchListings('/auction/listings');

  if (!listings) {
    return;
  }

  listings.forEach((z) => {
    if (!z) {
      return;
    }

    flattenArray(z.tags);
  });

  const uniqueTags = removeDuplicates(availableTags);
  createSelectElement(uniqueTags, fetchTagData);
  createCards(listings);
};

const createCards = (data) => {
  let slicedData = data.slice(startIndex, startIndex + perPage);
  container.innerHTML = '';

  slicedData.forEach((item) => {
    const cardElement = newCard(item);
    container.append(cardElement);
  });

  btnMoreListings.style.display = data.length > startIndex + perPage;

  btnMoreListings.addEventListener('click', () => {
    startIndex += perPage;

    let slicedData = data.slice(startIndex, startIndex + perPage);

    slicedData.forEach((item) => {
      const cardElement = newCard(item);
      container.append(cardElement);
    });

    btnMoreListings.style.display = data.length > startIndex + perPage;
  });
};

let isDropdownOpen = false;

const toggleDropdown = () => {
  const dropdown = document.getElementById('dropdown');
  isDropdownOpen = !isDropdownOpen;

  if (isDropdownOpen) {
    dropdown.classList.remove('hidden');
  } else {
    dropdown.classList.add('hidden');
  }
};

const addDropdownOptions = () => {
  const dropdown = document.getElementById('dropdown');
  const options = ['Ending soon', 'Recently listed', 'Expired'];

  options.forEach((option) => {
    const link = document.createElement('a');
    link.href = '#';
    link.className = 'block px-4 py-2 text-gray-800 hover:bg-gray-100';
    link.textContent = option;
    link.onclick = function () {
      optionSelected(option);
      toggleDropdown();
    };

    dropdown.appendChild(link);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  populateListings();
  addDropdownOptions();

  const dropdownButton = document.querySelector('.relative button');
  dropdownButton.addEventListener('click', toggleDropdown);
});
