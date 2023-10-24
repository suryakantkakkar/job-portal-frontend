import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const getJobs = async () => {
  try {
    const response = await axios.get(`${API_URL}/jobs`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
