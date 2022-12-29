// Add imports above this line

import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import '../css/common.css';
import '../css/01-gallery.css';

// Change code below this line

const galleryListElement = document.querySelector('.gallery');
const galleryMarkup = creatGalleryItemsMarkup(galleryItems);
galleryListElement.insertAdjacentHTML('beforeend', galleryMarkup);

function creatGalleryItemsMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
      <a class="gallery__link" href="${original}">
        <img class="gallery__image" src="${preview}" alt="${description}" />
      </a>`;
    })
    .join('');
}

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  captionType: 'alt',
  doubleTapZoom: 1,
});

galleryListElement.addEventListener('click', event => {
  event.preventDefault();
  if (!event.target.classList.contains('gallery__image')) {
    return;
  }

  galleryListElement.addEventListener('keydown', event => {
    if (event.code === 'Escape') {
      instance.close(() => {
        galleryListElement.removeEventListener('keydown', instance.close);
      });
    }
  });
});

console.log(galleryItems);
