import axios from 'axios';

export const requestImagesByQuery = async (query, page) => {
  const { data } = await axios.get(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=41408613-8c9b476e0301e60598d2b0325&image_type=photo&orientation=horizontal&per_page=12`
  );
  return data;
};
