import { makeRequest } from "./request";

<<<<<<< HEAD
const apiURL = "https://student-verse.herokuapp.com";
// const apiURL = "http://localhost:5000";
=======

// const apiURL = "https://student-verse.herokuapp.com";
const apiURL = "http://localhost:5000";
>>>>>>> b5f995aa80737972a7c729f68359c33b91af66ac
const siteURI = `${window.location.origin}/`;

export function getTopPosts() {
  const request = {
    method: "get",
    url: `${apiURL}/posts`,
  };

  return makeRequest(request);
}

export function getSingleQuestion(itemID) {
  const request = {
    method: "get",
    url: `${apiURL}/post/${itemID}`,
  };

  return makeRequest(request);
}

export function addAnswer(answer, token) {
  const request = {
    method: "post",
    url: `${apiURL}/addAnswer`,
    body: {
      post: answer.post,
      text: answer.text,
      votes: answer.votes,
      comment: answer.comment,
      score: answer.score,
    }
  }
  }
export function addQuestion(formData, token) {
  const request = {
    method: "post",
    url: `${apiURL}/addQuestion`,
    body: {
      title: formData.title,
      body: formData.body,
      tags: formData.tagname,
    },
    headerParams: {
      authorization: `Bearer ${token}`,
    },
  };

  return makeRequest(request);
}
