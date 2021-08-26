import { makeRequest } from "./request";

const apiURL = "https://student-verse.herokuapp.com";
// const apiURL = "http://localhost:5000";
const siteURI = `${window.location.origin}`;

export const URL_CONFIG = {
  siteUrl: `${siteURI}`,
  adminUrl: `${siteURI}/admin`,
};

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

export function updateProfile(uProfile, token) {
  const request = {
    method: "put",
    url: `${apiURL}/profile/update`,
    body: {
      fname: uProfile.fname,
      lname: uProfile.lname,
      email: uProfile.email,
      mobile: uProfile.mobile,
      password: uProfile.password,
      newPassword: uProfile.newPassword,
      address: uProfile.address,
    },
    headerParams: {
      authorization: `Bearer ${token}`,
    },
  };

  return makeRequest(request);
}

export function updatePassword(updPass, token) {
  const request = {
    method: "put",
    url: `${apiURL}/profile/updatePassword`,
    body: {
      password: updPass.upCurrentpassword,
      newPassword: updPass.newPassword,
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
  const request = {
    method: "post",
    url: `${apiURL}/subject`,
    body: subject,
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
export function createTopicD(topicData, token) {
  const request = {
    method: "post",
    url: `${apiURL}/topic`,
    body: { subject: topicData.subject, name: topicData.name },
    headerParams: {
      authorization: `Bearer ${token}`,
    },
  };
  return makeRequest(request);
}
export function getTopicD(subjectId, token) {
  const request = {
    method: "get",
    url: `${apiURL}/topic?subjectID=${subjectId}`,
    // body: {
    //   subject: subjectId,
    // },
    headerParams: {
      authorization: `Bearer ${token}`,
      test: "asdads",
    },
  };
  return makeRequest(request);
}
export function createSubTopicD(subTopicArg, token) {
  const request = {
    method: "post",
    url: `${apiURL}/chapter`,
    body: subTopicArg,
    headerParams: {
      authorization: `Bearer ${token}`,
    },
  };
  return makeRequest(request);
}
export function getSubTopic(token) {
  const request = {
    method: "get",
    url: `${apiURL}/chapter`,
    headerParams: {
      authorization: `Bearer ${token}`,
    },
  };
  return makeRequest(request);
}

// Search tags

export function fetchSearchTags(tags) {
  console.log("api hit", tags);
  const request = {
    method: "get",
    url: `${apiURL}/searchTag?tags=${tags}`,
  };

  return makeRequest(request);
}
export function fetchSearchPosts(question) {
  const request = {
    method: "get",
    url: `${apiURL}/searchPost?question=${question}`,
  };

  return makeRequest(request);
}

// Search users

export function fetchSearchUsers(name) {
  console.log("api hit", name);
  const request = {
    method: "get",
    url: `${apiURL}/searchUser?name=${name}`,
  };

  return makeRequest(request);
}

// Quiz
export function loadQuiz(chapter) {
  const request = {
    method: "get",
    url: `${apiURL}/quiz/${chapter}`,
  };

  return makeRequest(request);
}

export function createQuiz(quizData, chapter) {
  console.log("quizData", quizData);
  const request = {
    method: "post",
    url: `${apiURL}/quiz/${chapter}`,
    body: {
      question: quizData.question,
      options: quizData.options,
      answer: quizData.answer,
      name: quizData.name,
    },
  };
  return makeRequest(request);
}
