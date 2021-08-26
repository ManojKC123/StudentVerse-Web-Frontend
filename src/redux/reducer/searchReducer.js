const initialSate = {
  searchTags: [],
  searchPosts: [],
  searchUsers: [],
};

const searchReducer = function (state = initialSate, action) {
  if (action.type === "setSearchTags") {
    return {
      ...state,
      searchTags: action.payload,
    };
  }
    if (action.type === 'setSearchUsers') {
      return {
        ...state,
        searchUsers: action.payload,
      };
    }
  if (action.type === "setSearchPosts") {
    return {
      ...state,
      searchPosts: action.payload,
    };
  }
  return state;
};

export default searchReducer;
