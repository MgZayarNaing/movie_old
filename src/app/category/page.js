import axios from 'axios';
import { ENDPOINTS } from '../api/endpoint';

const getAuthToken = () => {
  return localStorage.getItem('access_token');
};

export const fetchCategories = async () => {
  try {
    const token = getAuthToken();
    const response = await axios.get(ENDPOINTS.CATEGORY_LIST, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data.results; 
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

