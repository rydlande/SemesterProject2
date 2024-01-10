const button = document.querySelector('#logoutBtn');

button.addEventListener('click', () => {
  localStorage.removeItem('token');
  localStorage.removeItem('name');

  setTimeout(() => {
    location.reload();
  }, 1000);
});
