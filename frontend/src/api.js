// src/api.js
export const fetchWithAuth = async (url, jwt, options = {}) => {
  return fetch(url, {
    ...options,
    headers: {
      'Authorization': `Bearer ${jwt}`,
      'Content-Type': 'application/json',
      ...options.headers
    }
  });
};
