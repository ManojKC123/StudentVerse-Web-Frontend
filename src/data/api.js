import { makeRequest } from "./request";

// const apiURL = "https://student-verse.herokuapp.com";
const apiURL = "http://localhost:5000";
const siteURI = `${window.location.origin}/`;

export function login(loginData) {
  const request = {
    method: "post",
    url: `${apiURL}/login`,
    body: {
      username: loginData.username,
      password: loginData.password,
    },
  };

  return makeRequest(request);
}

export function signup(signupData) {
  const request = {
    method: "post",
    url: `${apiURL}/signup`,
    body: {
      fname: signupData.fname,
      lname: signupData.lname,
      email: signupData.email,
      mobile: signupData.mobile,
      password: signupData.password,
      address: signupData.address,
    },
  };

  return makeRequest(request);
}

export function getProfile(token) {
  const request = {
    method: "get",
    url: `${apiURL}/profile`,
    headerParams: {
      authorization: `Bearer ${token}`,
    },
  };

  return makeRequest(request);
}

export function upProfile(updaProfile, token) {
  const request = {
    method: "post",
    url: `${apiURL}/user/update`,
    body: {
      fname: updaProfile.fname,
      lname: updaProfile.lname,
      email: updaProfile.email,
      mobile: updaProfile.mobile,
      password: updaProfile.password,
      address: updaProfile.address,
    },
    headerParams: {
      authorization: `Bearer ${token}`,
    },
  };

  return makeRequest(request);
}

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
    },
    headerParams: {
      authorization: `Bearer ${token}`,
    },
  };
  return makeRequest(request);
}

export function addQuestion(formData, token) {
  const request = {
    method: "post",
    url: `${apiURL}/addQuestion`,
    body: {
      title: formData.title,
      body: formData.body,
      tags: formData.tags,
    },
    headerParams: {
      authorization: `Bearer ${token}`,
    },
  };

  return makeRequest(request);
}

export function getAnswer(id) {
  const request = {
    method: "get",
    url: `${apiURL}/answers/${id}`,
  };

  return makeRequest(request);
}

export function addComment(commentD, token) {
  const request = {
    method: "post",
    url: `${apiURL}/addComment`,
    body: {
      question: commentD.questionID,
      text: commentD.textC,
      answer: commentD.id,
    },
    headerParams: {
      authorization: `Bearer ${token}`,
    },
  };
  return makeRequest(request);
}

export function upvote(voteData, token) {
  const request = {
    method: "post",
    url: `${apiURL}/upvote`,
    body: {
      post: voteData.post,
      answer: voteData.answer,
    },
    headerParams: {
      authorization: `Bearer ${token}`,
    },
  };

  return makeRequest(request);
}
export function downvote(voteData, token) {
  const request = {
    method: "post",
    url: `${apiURL}/downvote`,
    body: {
      post: voteData.post,
      answer: voteData.answer,
    },
    headerParams: {
      authorization: `Bearer ${token}`,
    },
  };

  return makeRequest(request);
}

// admin section

export function createSubjectD(subject, token) {
  console.log("subjectApiEnter", subject);
  const request = {
    method: "post",
    url: `${apiURL}/subject`,
    body: {
      name: subject.name,
      description: subject.description,
      picture: subject.picture,
    },
    headerParams: {
      authorization: `Bearer ${token}`,
    },
  };
  return makeRequest(request);
}

export function getSubject(token) {
  const request = {
    method: "get",
    url: `${apiURL}/subject`,
    headerParams: {
      authorization: `Bearer ${token}`,
    },
  };
  return makeRequest(request);
}
