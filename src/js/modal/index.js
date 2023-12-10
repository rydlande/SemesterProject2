const openmodal = document.querySelectorAll('.modal-open');

for (let i = 0; i < openmodal.length; i++) {
  openmodal[i].addEventListener('click', function (e) {
    const selectedModalTargetId = this.getAttribute('data-target');
    e.preventDefault();
    toggleModal(selectedModalTargetId);
  });
}

const overlay = document.querySelector('.modal-overlay');
overlay.addEventListener('click', toggleModal);

var closemodal = document.querySelectorAll('.modal-close');
for (var i = 0; i < closemodal.length; i++) {
  closemodal[i].addEventListener('click', toggleModal);
}

function toggleModal(selectedModalTargetId) {
  if (!selectedModalTargetId) {
    return;
  }
  const body = document.querySelector('body');

  const openModals = document.querySelectorAll('.modal');
  openModals.forEach((modal) => {
    if (modal.id !== selectedModalTargetId) {
      modal.classList.add('opacity-0', 'pointer-events-none');
    }
  });

  const modal = document.getElementById(selectedModalTargetId);
  modal.classList.toggle('opacity-0');
  modal.classList.toggle('pointer-events-none');
  body.classList.toggle('modal-active');
}
