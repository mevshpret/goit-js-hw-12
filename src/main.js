import { getImagesByQuery } from './js/pixabay-api';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

const searchForm = document.querySelector('.form');
const loadMoreButton = document.querySelector('.addMore');

let currentQuery = '';
let currentPage = 1;
let totalImagesAvailable = 0;
let totalImagesLoaded = 0;

searchForm.addEventListener('submit', onSearchFormSubmit);
loadMoreButton.addEventListener('click', onLoadMoreClick);

// Handle new search
async function onSearchFormSubmit(event) {
  event.preventDefault();

  const searchValue = searchForm.elements['search-text'].value.trim();
  if (searchValue === '') {
    iziToast.warning({
      message: 'Please enter a search term.',
      position: 'topRight',
    });
    return;
  }

  currentQuery = searchValue;
  currentPage = 1;
  totalImagesLoaded = 0;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const { hits, totalHits } = await getImagesByQuery(
      currentQuery,
      currentPage
    );

    if (hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    totalImagesAvailable = totalHits;
    totalImagesLoaded += hits.length;
    createGallery(hits);

    if (totalImagesLoaded < totalImagesAvailable) {
      showLoadMoreButton();
    } else {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    console.error('Search failed:', error);
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
    searchForm.reset();
  }
}

// Handle Load More
async function onLoadMoreClick() {
  currentPage += 1;
  hideLoadMoreButton();
  showLoader();

  try {
    const { hits } = await getImagesByQuery(currentQuery, currentPage);

    if (hits.length > 0) {
      createGallery(hits);
      totalImagesLoaded += hits.length;

      // Smooth scroll
      setTimeout(() => {
        const firstCard = document.querySelector('.gallery-item');
        if (firstCard) {
          const cardHeight = firstCard.getBoundingClientRect().height;
          window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth',
          });
        }
      }, 100);

      if (totalImagesLoaded < totalImagesAvailable) {
        showLoadMoreButton();
      } else {
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
        });
      }
    } else {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    console.error('Load more failed:', error);
    iziToast.error({
      message: 'Something went wrong while loading images.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}
