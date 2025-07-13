import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL + '/api/auth';

const registerStudent = async (userData) => {
  const response = await axios.post(`${API_URL}/student/register`, userData, { withCredentials: true });
  return response.data;
};

// Add other auth related functions here (login, logout, etc.)

export default { registerStudent };