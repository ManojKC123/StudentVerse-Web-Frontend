export const setSearchTags = (searchTags) => (dispatch) => {
  return dispatch({
    type: "setSearchTags",
    payload: searchTags,
  });
};
