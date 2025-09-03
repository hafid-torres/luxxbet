import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const spinTigrinho = async (betAmount) => {
  const response = await axios.post(`${API_URL}/games/tigrinho/spin`, { betAmount });
  return response.data;
};
