import { makeRequest } from "./request";

const apiURL = "https://api-emporium.spunk.link/api/v1";
const siteURI = `${window.location.origin}/`;

export function getTopPosts() {
  const request = {
    method: "get",
    url: `${apiURL}/posts`,
  };

  return makeRequest(request);
}
