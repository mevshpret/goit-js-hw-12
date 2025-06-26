import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery-link', {
  // options
  captions: true,
  // use alt attribute from <img>
  captionsData: 'alt',
  captionDelay: 250,
  // black strip below
  captionPosition: 'bottom',
});

const imagesList = document.querySelector('.gallery');

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="gallery-item">
    <a class="gallery-link" href="${largeImageURL}">
      <img
        class="gallery-image"
        src="${webformatURL}"
        alt="${tags}"
      />
    </a>
    <div class="statisticInfo">
      <div class="itemInfo">
        <h3 class="itemInfoName">Likes</h3>
        <p>${likes}</p>
      </div>
      <div class="itemInfo">
        <h3 class="itemInfoName">Views</h3>
        <p>${views}</p>
      </div>
      <div class="itemInfo">
        <h3 class="itemInfoName">Comments</h3>
        <p>${comments}</p>
      </div>
      <div class="itemInfo">
        <h3 class="itemInfoName">Downloads</h3>
        <p>${downloads}</p>  
       </div>
    </div>
  </li>`
    )
    .join('');

  imagesList.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
}

export function clearGallery() {
  const imagesList = document.querySelector('.gallery');
  imagesList.innerHTML = '';
}

export function showLoader() {
  const loader = document.querySelector('.loader');
  loader?.classList.add('active');
}

export function hideLoader() {
  const loader = document.querySelector('.loader');
  loader?.classList.remove('active');
}

export function showLoadMoreButton() {
  const addMore = document.querySelector('.addMore');
  addMore?.classList.add('active');
}

export function hideLoadMoreButton() {
  const addMore = document.querySelector('.addMore');
  addMore?.classList.remove('active');
}
