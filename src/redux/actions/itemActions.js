export const setSearchResults = (searchResults) => (dispatch) => {
  return dispatch({
    type: "setItemStore",
    payload: searchResults,
  });
};

// --------------
// export const searchQResult = () => {
//   return (dispatch) => {
//     dispatch(fetchSearchResult());
//     axios
//       .get("https://student-verse.herokuapp.com/search")
//       .then((response) => {
//         // response.data is the users
//         const users = response.data;
//         dispatch(fetchUsersSuccess(users));
//       })
//       .catch((error) => {
//         // error.message is the error message
//         dispatch(fetchUsersFailure(error.message));
//       });
//   };
// };

export const fetchSearhRequest = () => {
  return {
    type: "FETCH_SEARCH_REQUEST",
  };
};

export const fetchSearchSuccess = (users) => {
  return {
    type: "FETCH_SEARCH_SUCCESS",
    payload: users,
  };
};

export const fetchSearchFailure = (error) => {
  return {
    type: "FETCH_SEARCH_FAILURE",
    payload: error,
  };
};
