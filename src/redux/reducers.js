const initialState = {
  searchHistory: [],
  user: null,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_USER':
      return { ...state, user: action.payload };
    case 'ADD_SEARCH_HISTORY':
      return { ...state, searchHistory: [...state.searchHistory, action.payload] };
    default:
      return state;
  }
}

export default rootReducer;
