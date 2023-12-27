
const TYPES_OF_FILE = ['gif', 'jpg', 'jpeg', 'png'];

const body = document.querySelector('body');
const modal = document.querySelector('.modal');
const imgForm = document.querySelector('.form__img');

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
};

const initMaskInput = () => {
  const phone = document.getElementById('user-phone');
  const maskOptions = {
    mask: '+7 000 000-00-00'
  };
  const mask = IMask(phone, maskOptions);
}

const initPreview = () => {
  if (!imgForm) {
    return;
  }

  const uploadInput = imgForm.querySelector('input[type=file]');
  const preview = imgForm.querySelector('.form__img-preview');
 
  uploadInput.addEventListener('change', () => {
    const imgFile = uploadInput.files[0];
    const imgFileName = imgFile.name.toLowerCase();
  
    const matches = TYPES_OF_FILE.some((it) =>
      imgFileName.endsWith(it),
    );
  
    if (matches) {
      const previewImg = document.createElement('img');
      preview.append(previewImg);
      previewImg.src = URL.createObjectURL(imgFile);
    }
  });

  document.addEventListener('click', (evt) => {
    if(evt.target.closest('[data-file-del]') && preview.querySelector('img')) {
      preview.querySelector('img').remove();
    }
  });
};

window.addEventListener('load', () => {

  document.addEventListener('click', (evt) => {
    if(evt.target.closest('[data-open-modal')) {
      initModal();
      initMaskInput();
      initPreview();
    }
  });
});
