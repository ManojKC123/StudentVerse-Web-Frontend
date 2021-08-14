export const setSearchTags = (searchTags) => (dispatch) => {
  return dispatch({
    type: "setSearchTags",
    payload: searchTags,
  });
};

export const setSearchPosts = (searchPosts) => (dispatch) => {
  return dispatch({
    type: "setSearchPosts",
    payload: searchPosts,
  });
};
