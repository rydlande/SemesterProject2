const button = document.querySelector('#logoutBtn');

button.addEventListener('click', () => {
  localStorage.removeItem('token');
  localStorage.removeItem('name');

  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1000);
});
