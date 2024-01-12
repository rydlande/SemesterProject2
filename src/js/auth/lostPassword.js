function lostPasswordModal() {
  const button = document.querySelector('#lostPasswordButton');
  const email = document.querySelector('#lostPasswordEmail');
  const response = document.querySelector('#lostPasswordResponse');

  const validEmail =
    /^(?:[a-zA-Z0-9._%+-]+@stud\.noroff\.no)|(?:[a-zA-Z0-9._%+-]+@noroff\.no)$/;

  button.addEventListener('click', (e) => {
    e.preventDefault();
    if (email.value === '') {
      response.style.color = 'red';
      response.innerText = `Email required`;
    } else if (!validEmail.test(email.value)) {
      response.style.color = 'red';
      response.innerText = `Invalid email`;
    } else {
      response.style.color = 'green';
      response.style.fontStyle = 'normal';
      response.innerText = `We sent you a link to create a new password. The link is valid for 10 minutes.`;
    }
  });
}
lostPasswordModal();
