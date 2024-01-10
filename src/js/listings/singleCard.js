import bid from './bids.js';
import { URL } from '../api/constants.js';
export const responseSendBid = document.createElement('p');

export function container(data) {
  let { id, title, description, media, created, updated, endsAt, seller } =
    data;

  const container = document.createElement('div');
  container.classList.add('container');

  const topSection = document.createElement('section');
  topSection.classList.add('topSection');
  const imageDiv = document.createElement('div');
  const image = document.createElement('img');
  imageDiv.classList.add('imageDiv');
  image.classList.add('imageListing');
  imageDiv.appendChild(image);
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

  const flexContainer = document.createElement('div');
  flexContainer.classList.add('flexContainer');
  const titleAndDescriptionDiv = document.createElement('div');
  titleAndDescriptionDiv.classList.add('titleAndDescription');

  const titleHeading = document.createElement('h1');
  titleHeading.classList.add('titleListing');
  titleHeading.textContent = title;

  const idSpan = document.createElement('span');
  idSpan.classList.add('spanID');
  idSpan.textContent = `#${id}`;

  const descriptionParagraph = document.createElement('p');
  descriptionParagraph.classList.add('description');
  descriptionParagraph.textContent = description;

  titleAndDescriptionDiv.append(titleHeading, idSpan, descriptionParagraph);

  const listingInfoDiv = document.createElement('div');
  listingInfoDiv.classList.add('listingInfo');

  const endsAtDate = new Date(endsAt);
  const createdDate = new Date(created);
  const editedDate = new Date(updated);
  const createdOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  const seller1 = document.createElement('p');
  const endsAt1 = document.createElement('p');
  const created1 = document.createElement('p');
  const edited1 = document.createElement('p');
  seller1.classList.add('top');
  endsAt1.classList.add('top');
  created1.classList.add('top');
  edited1.classList.add('top');
  seller1.textContent = seller.name;
  endsAt1.textContent = endsAtDate.toLocaleString('en-US', createdOptions);
  created1.textContent = createdDate.toLocaleString('en-US', createdOptions);
  edited1.textContent = editedDate.toLocaleString('en-US', createdOptions);

  const seller2 = document.createElement('p');
  const endsAt2 = document.createElement('p');
  const created2 = document.createElement('p');
  const edited2 = document.createElement('p');
  seller2.classList.add('under');
  endsAt2.classList.add('under');
  created2.classList.add('under');
  edited2.classList.add('under');
  seller2.innerText = 'Seller';
  endsAt2.innerText = 'Ending';
  created2.innerText = 'Created';
  edited2.innerText = 'Updated';

  listingInfoDiv.append(
    seller1,
    seller2,
    endsAt1,
    endsAt2,
    created1,
    created2,
    edited1,
    edited2,
  );
  const hr = document.createElement('hr');
  hr.classList.add('hrFlexContainer');
  flexContainer.append(titleAndDescriptionDiv, hr, listingInfoDiv);
  topSection.append(imageDiv, flexContainer);

  const midSection = document.createElement('section');
  midSection.classList.add('mid');

  const addBidDiv = document.createElement('div');
  addBidDiv.classList.add('addBid');

  const btnMinus = document.createElement('button');
  btnMinus.classList.add('btnMinus');
  btnMinus.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
  </svg>
`;
  btnMinus.addEventListener('click', () => {
    updateBidAmount(-1);
  });

  const inputBid = document.createElement('input');
  inputBid.setAttribute('type', 'text');
  inputBid.setAttribute('placeholder', 'Enter amount');
  inputBid.setAttribute('id', 'inputBid');

  const btnPlus = document.createElement('button');
  btnPlus.classList.add('btnPlus');
  btnPlus.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  `;
  btnPlus.addEventListener('click', () => {
    updateBidAmount(1);
  });

  addBidDiv.append(btnMinus, inputBid, btnPlus);

  const sendBidDiv = document.createElement('div');
  sendBidDiv.classList.add('sendBid');

  const btnSendBid = document.createElement('button');
  btnSendBid.classList.add('btnSendBid');
  btnSendBid.textContent = 'Place bid';
  btnSendBid.addEventListener('click', async () => {
    await bid(URL);
  });

  responseSendBid.classList.add('responseSendBid');
  responseSendBid.id = 'responseSendBid';

  sendBidDiv.appendChild(btnSendBid);
  midSection.append(
    document.createElement('hr'),
    addBidDiv,
    sendBidDiv,
    responseSendBid,
    document.createElement('hr'),
  );

  const bids = data.bids || [];
  const sortedBids = bids.slice().sort((a, b) => b.amount - a.amount);

  const bottomSection = document.createElement('section');
  bottomSection.classList.add('bottom');

  const topBidH3 = document.createElement('h3');
  topBidH3.classList.add('bidsH3');
  topBidH3.textContent = 'Top bid';

  const topBidTable = document.createElement('table');
  topBidTable.classList.add('table');

  const topBidRow = document.createElement('tr');

  const topBid = sortedBids[0];

  const topBidUsername = document.createElement('td');
  const topBidCreated = document.createElement('td');
  const topBidAmount = document.createElement('td');
  topBidUsername.classList.add('bidUsername');
  topBidCreated.classList.add('bidCreated');
  topBidAmount.classList.add('bidAmount');
  topBidUsername.textContent = topBid.bidderName;
  topBidAmount.textContent = `${topBid.amount} credits`;

  const min = Math.floor((new Date() - new Date(topBid.created)) / 60000);
  const days = Math.floor(min / 60 / 24);
  const hours = Math.floor(min / 60);

  if (min < 1) {
    topBidCreated.innerText = 'Now';
  } else if (min < 60) {
    topBidCreated.innerText = `${min} ${min === 1 ? 'minute' : 'minutes'}`;
  } else if (min < 60 * 24) {
    topBidCreated.innerText = `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
  } else {
    topBidCreated.innerText = `${days} ${days === 1 ? 'day' : 'days'}`;
  }

  topBidRow.append(topBidUsername, topBidCreated, topBidAmount);
  topBidTable.appendChild(topBidRow);

  const allBidsH3 = document.createElement('h3');
  allBidsH3.classList.add('bidsH3');
  allBidsH3.textContent = 'All bids';

  const allBidsTable = document.createElement('table');
  allBidsTable.classList.add('table');

  for (let i = 1; i < sortedBids.length; i++) {
    const bid = sortedBids[i];
    const allBidsRow = document.createElement('tr');

    const bidUsername = document.createElement('td');
    const bidCreated = document.createElement('td');
    const bidAmount = document.createElement('td');
    bidUsername.classList.add('bidUsername');
    bidCreated.classList.add('bidCreated');
    bidAmount.classList.add('bidAmount');
    bidUsername.textContent = bid.bidderName;
    bidAmount.textContent = `${bid.amount} credits`;

    const min = Math.floor((new Date() - new Date(bid.created)) / 60000);
    const days = Math.floor(min / 60 / 24);
    const hours = Math.floor(min / 60);
    if (min < 1) {
      bidCreated.innerText = 'Now';
    } else if (min < 60) {
      bidCreated.innerText = `${min} ${min === 1 ? 'minute' : 'minutes'}`;
    } else if (min < 60 * 24) {
      bidCreated.innerText = `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
    } else {
      bidCreated.innerText = `${days} ${days === 1 ? 'day' : 'days'}`;
    }

    allBidsRow.append(bidUsername, bidCreated, bidAmount);
    allBidsTable.appendChild(allBidsRow);
  }

  bottomSection.append(
    topBidH3,
    topBidTable,
    document.createElement('hr'),
    allBidsH3,
    allBidsTable,
  );

  const value = Number(inputBid.value);
  function updateBidAmount(value) {
    let currentAmount = parseInt(inputBid.value) || 0;

    if (value === -1 && currentAmount > 0) {
      currentAmount += value;
    } else if (value === 1) {
      currentAmount += value;
    }
    inputBid.value = currentAmount;
  }

  if (value < topBid.value + 1) {
    inputBid.value = topBid.value + 1;
  } else if (value > topBid.value) {
    inputBid.value = topBid.value;
  }

  container.append(topSection, midSection, bottomSection);
  return container;
}
