function state() {
  const token = localStorage.getItem('token');
  const login = document.querySelector('#loginBtn');
  const logout = document.querySelector('#logoutBtn');

  if (!token) {
    login.innerText = 'Log in';
    login.style.display = 'block';
    logout.style.display = 'none';
  } else if (token === 'undefined' || token === 'Undefined') {
    login.innerText = 'Log in';
    login.style.display = 'block';
    logout.style.display = 'none';
  } else {
    logout.innerText = 'Log out';
    logout.style.display = 'block';
    login.style.display = 'none';
  }
}
state();
