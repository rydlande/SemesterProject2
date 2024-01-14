import { URL } from './constants.js';

export const fetchListings = async (endpoint, tag = '') => {
  try {
    const storedEndpoint = window.sessionStorage.getItem('filterEndpoint');

    const res = await fetch(URL + `${endpoint}?${storedEndpoint}&_tag=${tag}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('API request failed');
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchData = async (endpoint, queryParams) => {
  try {
    const res = await fetch(URL + `${endpoint}?${queryParams}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('API request failed');
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};
