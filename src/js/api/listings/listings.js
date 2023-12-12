import { apiPath } from '../constants.js';
const container = document.querySelector('#container');
let perPage = 10;
let startIndex = 0;

/* If I want to remove the listings that has an error because or media:
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
      throw new Error(`Error fetching data: ${res.status}`);
    }

    const data = await res.json();
    let slicedData = data.slice(startIndex, startIndex + perPage);
    console.log(slicedData);
    slicedData.forEach((item) => {
      const cardElement = card(item);
      container.append(cardElement);
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // Handle the error as needed, e.g., display a message to the user.
  }
}

// ... rest of your code ...
*/

async function listings() {
  const res = await fetch(
    apiPath + '/auction/listings?_bids=true&_active=true',
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const data = await res.json();
  let slicedData = data.slice(startIndex, startIndex + perPage);
  console.log(slicedData);
  slicedData.forEach((item) => {
    const cardElement = card(item);
    container.append(cardElement);
  });
}
listings();

function card(data) {
  const bids = data.bids || [];
  const highestBid =
    bids.length > 0 ? Math.max(...bids.map((bid) => bid.amount)) : 0;

  let { id, title, description, tags, media, created, updated, endsAt } = data;

  /* CARD */
  const card = document.createElement('div');
  card.classList.add('card');

  /* skal være en a-tag senere */
  const cardLink = document.createElement('div');
  cardLink.href = `../../../../en_gb/listing/?id=${id}`;

  /* IMAGE CONTAINER */
  const listingImageContainer = document.createElement('div');
  listingImageContainer.classList.add('listingImageContainer');

  /* IMAGE */
  const listingImage = document.createElement('img');
  listingImage.classList.add('listingImage');

  listingImageContainer.appendChild(listingImage);
  cardLink.appendChild(listingImageContainer);
  if (media.length === 0) {
    listingImageContainer.innerHTML = `
    <div class="flex flex-col items-center justify-center w-full h-48 bg-gray-light rounded-sm">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
        <p class="text-sm">No image</p>
    </div>`;
  } else {
    listingImage.src = media;

    listingImage.onerror = function () {
      listingImageContainer.innerHTML = `
          <div class="flex flex-col items-center justify-center w-full h-48 bg-gray-light rounded-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <p class="text-sm">Image not available</p>
          </div>`;
    };
  }

  /* TITTEL */
  const listingTitle = document.createElement('h2');
  listingTitle.textContent = title;
  listingTitle.classList.add('listingTitle');
  cardLink.appendChild(listingTitle);

  /* TIMESTAMP */
  const timestamp = document.createElement('p');
  timestamp.classList.add('timestamp');
  const endsAtTime = new Date(endsAt).getTime();
  let intervalId;

  function updateTimestamp() {
    const currentTime = new Date().getTime();
    const remainingTime = endsAtTime - currentTime;

    if (remainingTime > 0) {
      const seconds = Math.floor(remainingTime / 1000) % 60;
      const minutes = Math.floor(remainingTime / (1000 * 60)) % 60;
      const hours = Math.floor(remainingTime / (1000 * 60 * 60));
      if (hours > 0) {
        timestamp.innerText = `${hours}h ${minutes}m left`;
      } else if (minutes > 0) {
        timestamp.innerText = `${minutes}m ${seconds}s left`;
      } else {
        timestamp.innerText = `${seconds}s left`;
      }
    } else {
      timestamp.innerText = 'Auction ended';
      clearInterval(intervalId);
    }
  }

  updateTimestamp();
  intervalId = setInterval(updateTimestamp, 1000);
  cardLink.appendChild(timestamp);

  /* LINK TIL CARD + CARD TIL CONTAINER */
  card.appendChild(cardLink);
  container.appendChild(card);
  return card;
}
