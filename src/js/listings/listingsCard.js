/**
 * Creates a card element for a listing.
 *
 * @param {Object} data - Listing data.
 * @param {Array} data.bids - Array of bids for the listing.
 * @param {number} data.id - Unique identifier for the listing.
 * @param {string} data.title - Title of the listing.
 * @param {string} data.description - Description of the listing.
 * @param {Array} data.tags - Array of tags associated with the listing.
 * @param {string} data.media - Media (image or video) associated with the listing.
 * @param {string} data.created - Timestamp indicating when the listing was created.
 * @param {string} data.updated - Timestamp indicating when the listing was last updated.
 * @param {string} data.endsAt - Timestamp indicating when the listing auction ends.
 * @returns {HTMLElement} - The created card element.
 */

export function card(data) {
  const bids = data.bids || [];
  const highestBid =
    bids.length > 0 ? Math.max(...bids.map((bid) => bid.amount)) : 0;

  let { id, title, description, tags, media, created, updated, endsAt } = data;

  const card = document.createElement('div');
  card.classList.add('card');

  const cardLink = document.createElement('a');
  cardLink.href = `../../../../en_gb/listing/?id=${id}`;

  const cardTop = document.createElement('div');
  cardTop.classList.add('cardTop');

  const countdown = document.createElement('div');
  countdown.classList.add('countdown');
  const countdownBox = document.createElement('div');
  countdownBox.classList.add('countdownBox');

  const clockIcon = document.createElement('div');
  clockIcon.classList.add('clockIcon');
  clockIcon.innerHTML = `
          <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-3 h-3 stroke-black"
          >
              <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
          </svg>
          `;

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

  countdownBox.append(clockIcon, timestamp);
  countdown.appendChild(countdownBox);

  const imageBox = document.createElement('div');
  imageBox.classList.add('imageBox');
  const image = document.createElement('img');
  image.classList.add('image');

  if (media.length === 0) {
    imageBox.innerHTML = `
      <div class="flex flex-col items-center justify-center w-full h-48 bg-gray-200 rounded-sm">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          <p class="text-sm">No image</p>
      </div>`;
  } else {
    image.src = media;

    image.onerror = function () {
      imageBox.innerHTML = `
          <div class="flex flex-col items-center justify-center w-full h-48 bg-gray-200 rounded-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <p class="text-sm">Error loading image</p>
          </div>`;
    };
  }
  imageBox.appendChild(image);
  cardTop.append(countdown, imageBox);
  cardLink.appendChild(cardTop);

  const cardBottom = document.createElement('div');
  cardBottom.classList.add('cardBottom');
  const titleBox = document.createElement('div');
  titleBox.classList.add('titleBox');

  const cardTitle = document.createElement('h2');
  cardTitle.textContent = title;
  cardTitle.classList.add('title');
  titleBox.appendChild(cardTitle);

  const textBox = document.createElement('div');
  textBox.classList.add('textBox');

  const currentPrice = document.createElement('p');
  currentPrice.textContent = `€${highestBid}`;
  currentPrice.classList.add('currentPrice');

  const arrow = document.createElement('div');
  arrow.classList.add('arrow');
  arrow.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"/>
      </svg>`;

  textBox.append(currentPrice, arrow);
  cardBottom.append(titleBox, textBox);
  cardLink.appendChild(cardBottom);

  card.appendChild(cardLink);
  return card;
}
