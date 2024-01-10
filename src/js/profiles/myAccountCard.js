export function container(data) {
  let { name, email, avatar, credits, listings, wins, _count } = data;

  const container = document.createElement('div');
  container.classList.add('myAccountContainer');

  const profileInfoSection = document.createElement('section');
  profileInfoSection.classList.add('profileInfo');

  const avatarDiv = document.createElement('div');
  avatarDiv.classList.add('avatarDiv');

  const image = document.createElement('img');
  image.classList.add('avatar');
  if (avatar === null) {
    avatarDiv.innerHTML = `<img src="https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D" alt="">` /* `
          <div class="flex flex-col items-center justify-center w-full h-48 bg-gray-200 rounded-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
              <p class="text-sm">No image</p>
          </div>` */;
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

  const overviewSectionSection = document.createElement('section');
  overviewSectionSection.classList.add('overviewSection');

  const sections = ['usersBids', 'usersListings', 'usersWins', 'editProfile'];

  sections.forEach((sectionName) => {
    const div = document.createElement('div');
    div.classList.add(sectionName);
    div.dataset.section = sectionName;
    div.textContent = sectionName.replace(/([A-Z])/g, ' $1').trim(); // Capitalized text
    const hr = document.createElement('hr');
    overviewSectionSection.append(div, hr);
  });
  /* 
  const hiddenMenuSection = document.createElement('section');
  hiddenMenuSection.classList.add('hiddenMenu');
  hiddenMenuSection.id = 'hiddenMenu';

  const backButton = document.createElement('button');
  backButton.textContent = 'Back';
  backButton.addEventListener('click', () => {
    overviewDiv.style.display = 'flex';

    hiddenMenuSection.style.display = 'none';
  });

  hiddenMenuSection.appendChild(backButton); */

  container.append(profileInfoSection, overviewSectionSection);
  return container;
}
