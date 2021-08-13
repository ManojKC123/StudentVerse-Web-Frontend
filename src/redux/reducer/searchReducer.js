const initialSate = {
  searchTags: [],
};

const searchReducer = function (state = initialSate, action) {
  if (action.type === "setSearchTags") {
    return {
      ...state,
      searchTags: action.payload,
    };
  }
  return state;
};

export default searchReducer;
