export function container(data) {
  let {
    id,
    title,
    description,
    tags,
    media,
    created,
    updated,
    endsAt,
    seller,
  } = data;

  /* CONTAINER */
  const container = document.createElement('div');
  container.classList.add('container');

  /* TOP CONTAINER */
  const containerTop = document.createElement('div');
  containerTop.classList.add('containerTop');

  /* IMAGE */
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
  containerTop.append(imageBox);

  /* TITLE */
  const titleBox = document.createElement('div');
  titleBox.classList.add('titleBox');

  const containerTitle = document.createElement('h1');
  containerTitle.classList.add('title');
  containerTitle.textContent = title;

  /* ID */
  const idSpan = document.createElement('span');
  idSpan.classList.add('spanID');
  idSpan.textContent = `#${id}`;

  /* DESCRIPTION */
  const containerDescription = document.createElement('p');
  containerDescription.classList.add('description');
  containerDescription.textContent = description;

  titleBox.append(containerTitle, idSpan, containerDescription);
  containerTop.appendChild(titleBox);

  /* MID CONTAINER */
  const containerMid = document.createElement('div');
  containerMid.classList.add('containerMid');

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

  /* Seller, EndsAt, Created, Updated */
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

  containerMid.append(
    seller1,
    seller2,
    endsAt1,
    endsAt2,
    created1,
    created2,
    edited1,
    edited2,
  );

  /* SORT BIDS */
  const bids = data.bids || [];
  const sortedBids = bids.slice().sort((a, b) => b.amount - a.amount);
  console.log(sortedBids[0].bidderName);
  console.log(sortedBids[0]);

  /* BOTTOM CONTAINER */
  const containerBottom = document.createElement('div');
  containerBottom.classList.add('containerBottom');

  /* Top bid */
  const topBidH3 = document.createElement('h3');
  topBidH3.classList.add('bidsH3');
  topBidH3.innerText = 'Top bid';
  const allBids = document.createElement('h3');
  allBids.classList.add('bidsH3');
  allBids.innerText = 'All bids';

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
  topBidAmount.textContent = topBid.amount;

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

  /* All bids */
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
    bidAmount.textContent = bid.amount;

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
  containerBottom.append(topBidH3, topBidTable, allBids, allBidsTable);

  container.append(containerTop, containerMid, containerBottom);
  return container;
}

/* 
const  = document.createElement("div")
.classList.add("")
 */
