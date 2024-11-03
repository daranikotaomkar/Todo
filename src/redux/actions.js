export const loginUser = (username) => ({
  type: 'LOGIN_USER',
  payload: username,
});

export const addSearchHistory = (query) => ({
  type: 'ADD_SEARCH_HISTORY',
  payload: { query, timestamp: new Date().toISOString() },
});
