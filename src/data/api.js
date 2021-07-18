import { makeRequest } from "./request";

const apiURL = "https://student-verse.herokuapp.com";
// const apiURL = "http://localhost:5000";
const siteURI = `${window.location.origin}/`;

export function getTopPosts() {
  const request = {
    method: "get",
    url: `${apiURL}/posts`,
  };

  return makeRequest(request);
}
