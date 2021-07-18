import axios from "axios";

export function makeRequest({
  body = null,
  method = "get",
  url = "",
  headerParams = null,
}) {
  let headers = {
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  if (headerParams) {
    headers = { ...headers, ...headerParams };
  }

  return axios({
    method,
    url,
    headers: headers,
    ...(Boolean(body) && { data: body }),
  })
    .then((res) => res.data)
    .catch((error) => {
      return false;
      //throw error.response
    });
}
