const body = document.querySelector('body');
const modal = document.querySelector('.modal');

const initModal = () => {
    if (!modal) {
        return;
    }

    const closeModal = () => {
        modal.classList.remove('is-active');
        body.classList.remove('scroll-lock');
    }

    modal.classList.add('is-active');
    body.classList.add('scroll-lock');

    document.addEventListener('click', (evt) => {
      if(evt.target.closest('[data-close-modal]')) {
        closeModal();
      }

      if(evt.target.closest('.modal') && !evt.target.closest('.modal__content')) {
        closeModal();
      }
    })

    document.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape' || evt.key === 'Esc') {
            evt.preventDefault();
            closeModal();
        }
    });   
}

window.addEventListener('load', () => {

  document.addEventListener('click', (evt) => {
    if(evt.target.closest('[data-open-modal')) {
      initModal();
    }
  });
});
