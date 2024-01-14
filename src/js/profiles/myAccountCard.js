export function container(data) {
  let { name, email, avatar, credits, listings, wins, _count } = data;

  const profileInfoSection = document.createElement('div');
  profileInfoSection.classList.add('profileInfo');

  const avatarDiv = document.createElement('div');
  avatarDiv.classList.add('avatarDiv');

  const image = document.createElement('img');
  image.classList.add('avatar');
  if (avatar === null) {
    image.style.display = 'none';
    avatarDiv.innerHTML = `
          <div class="flex flex-col items-center justify-center w-full h-48 bg-gray-200 rounded-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
              <p class="text-sm">No image</p>
          </div>`;
  } else {
    image.src = avatar;
    image.onerror = function () {
      avatarDiv.innerHTML = `
              <div class="flex flex-col items-center justify-center w-full h-48 bg-gray-200 rounded-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
                  <p class="text-sm">Error loading image</p>
              </div>`;
    };
  }
  avatarDiv.appendChild(image);

  const nameEmailDiv = document.createElement('div');
  nameEmailDiv.classList.add('nameEmail');

  const username = document.createElement('h2');
  username.classList.add('username');
  username.textContent = name;

  const accountEmail = document.createElement('p');
  accountEmail.classList.add('email');
  accountEmail.textContent = email;

  nameEmailDiv.append(username, accountEmail);
  profileInfoSection.append(avatarDiv, nameEmailDiv);

  return profileInfoSection;
}
/* 
Skulle lage en "tab"- eller toogle-meny for å vise brukeres listings, listings de har gitt bud på og vinn. 
I samme section skulle det også være en knapp for å kunne endre avatar-bilde.

export function cards(userdata) {
  const bids = userdata.bids || [];
  const highestBid =
    bids.length > 0 ? Math.max(...bids.map((bid) => bid.amount)) : 0;

  let { id, title, description, media, created, updated, endsAt, seller } =
    userdata;

  const overviewSection = document.createElement('div');
  overviewSection.classList.add('overviewSection');

  for (let i = 1; i <= 3; i++) {
    const menu = document.createElement('div');
    menu.classList.add('menu');
    menu.setAttribute('data-name', i);
    menu.textContent = `#${i}`;
    overviewSection.appendChild(menu);
  }

  for (let i = 1; i <= 3; i++) {
    const button = document.createElement('button');
    button.classList.add('menu-button');
    button.setAttribute('data-name', i);
    button.textContent = `Menu #${i}`;
    overviewSection.appendChild(button);
  }

  const menus = document.querySelectorAll('.menu');
  const menuButtons = document.querySelectorAll('.menu-button');

  menuButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const dataName = button.getAttribute('data-name');

      menus.forEach((menu) => {
        menu.style.display = 'none';
      });

      const selectedMenu = document.querySelector(
        `.menu[data-name="${dataName}"]`,
      );
      if (selectedMenu) {
        selectedMenu.style.display = 'block';
      }
    });
  });

  const cardLink = document.createElement('a');
  cardLink.href = `../../listing/?id=${id}`;
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

  overviewSection.append();
  return overviewSection;
} */
