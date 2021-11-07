const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR = 'img/muffin-grey.svg';

const avatarChooser = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const housePhotoChooser = document.querySelector('#images');
const housePhotoPreview = document.querySelector('.ad-form__photo');

avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((fileType) =>  fileName.endsWith(fileType));

  if (matches) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

housePhotoChooser.addEventListener('change', () => {
  const file = housePhotoChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((fileType) =>  fileName.endsWith(fileType));

  if (matches) {
    housePhotoPreview.style.backgroundImage = `url('${URL.createObjectURL(file)}')`;
    housePhotoPreview.style.backgroundRepeat = 'no-repeat';
    housePhotoPreview.style.backgroundSize = 'contain';
  }
});

const resetPhotos = () => {
  avatarPreview.src = DEFAULT_AVATAR;
  housePhotoPreview.style.backgroundImage = '';
};

export {resetPhotos};

