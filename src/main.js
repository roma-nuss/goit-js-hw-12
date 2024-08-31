import { searchImages } from './js/pixabay-api';
import { showSearchResults } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const elements = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('.search-input'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
  btnLoadMore: document.querySelector('.load-more-btn'),
};

const photosGallery = new simpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  overlayOpacity: 0.8,
});

elements.form.addEventListener('submit', searchHandler);
elements.btnLoadMore.addEventListener('click', onLoadMore);

let curentPage = 1;
let searchString = '';

async function searchHandler(event) {
  event.preventDefault();
  elements.gallery.innerHTML = '';
  searchString = elements.input.value.trim();
  curentPage = 1;

  elements.btnLoadMore.classList.add('visually-hidden');

  if (searchString === '') {
    return iziToast.error({
      message: 'Search field can not be empty!',
      position: 'topCenter',
      timeout: 3000,
      messageColor: '#fafafb',
      backgroundColor: '#ef4040',

      progressBarColor: '#b51b1b',
      maxWidth: '432px',
    });
  }
  elements.loader.classList.remove('visually-hidden');
  try {
    const data = await searchImages(searchString, curentPage);

    if (data.hits.length === 0) {
      return iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        timeout: 3000,
        messageColor: '#fafafb',
        backgroundColor: '#ef4040',

        progressBarColor: '#b51b1b',
        maxWidth: '432px',
      });
    }
    elements.gallery.innerHTML = showSearchResults(data.hits);
    photosGallery.refresh();
    elements.input.value = '';
    if (data.totalHits > 15) {
      elements.btnLoadMore.classList.remove('visually-hidden');
    }
  } catch (error) {
    iziToast.error({
      message: `Something went wrong... Error: ${error.message}`,
      position: 'topCenter',
      timeout: 3000,
      messageColor: '#fafafb',
      backgroundColor: '#ef4040',

      progressBarColor: '#b51b1b',
      maxWidth: '432px',
    });
  } finally {
    elements.loader.classList.add('visually-hidden');
  }
}

async function onLoadMore() {
  curentPage++;
  elements.loader.classList.remove('visually-hidden');
  try {
    const data = await searchImages(searchString, curentPage);
    elements.gallery.insertAdjacentHTML(
      'beforeend',
      showSearchResults(data.hits)
    );
    photosGallery.refresh();
    const { height } =
      elements.gallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: height * 2,

      behavior: 'smooth',
    });
    if (Math.ceil(data.totalHits / 15) === curentPage) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topCenter',
        timeout: 3000,
        messageColor: '#fafafb',
        backgroundColor: '#ef4040',

        progressBarColor: '#b51b1b',
        maxWidth: '432px',
      });
      elements.btnLoadMore.classList.add('visually-hidden');
    }
  } catch (error) {
    iziToast.error({
      message: `Something went wrong... Error: ${error.message}`,
      position: 'topCenter',
      timeout: 3000,
      messageColor: '#fafafb',
      backgroundColor: '#ef4040',

      progressBarColor: '#b51b1b',
      maxWidth: '432px',
    });
  } finally {
    elements.loader.classList.add('visually-hidden');
  }
}
