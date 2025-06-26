import axios from 'axios';

const API_KEY = '50595955-e0b6c1995a30b33308caba1cc';

axios.defaults.baseURL = 'https://pixabay.com/api/';
// axios.defaults.per_page = 9;

export function getImagesByQuery(query, page) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page: page,
  };
  return axios('', { params }).then(({ data }) => data);
}
