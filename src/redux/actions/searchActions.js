export const setSearchTags = (searchTags) => (dispatch) => {
  return dispatch({
    type: "setSearchTags",
    payload: searchTags,
  });
};

export const setSearchUsers = (searchUsers) => (dispatch) => {
  return dispatch({
    type: 'setSearchUsers',
    payload: searchUsers,
  });
};

export const setSearchPosts = (searchPosts) => (dispatch) => {
  return dispatch({
    type: "setSearchPosts",
    payload: searchPosts,
  });
};
