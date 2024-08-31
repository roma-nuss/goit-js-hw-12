import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const API_KEY = '23838686-34a57fb5ee7e13f7202c685b1';

async function searchImages(str, page) {
  const params = {
    q: str,
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: 15,
  };
  const { data } = await axios(URL, {
    params,
  });
  return data;
}

export { searchImages };
