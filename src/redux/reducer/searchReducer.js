const initialSate = {
  searchResults: [],
};

const Reducer = function (state = initialSate, action) {
  if (action.type === "setSearchResults") {
    return {
      ...state,
      searchResults: action.payload,
    };
  }
};
// -------------
const initialState = {
  loading: false,
  searchResult: [],
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USERS_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_USERS_SUCCESS":
      return {
        loading: false,
        users: action.payload,
        error: "",
      };
    case "FETCH_USERS_FAILURE":
      return {
        loading: false,
        users: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
