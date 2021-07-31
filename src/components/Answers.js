import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { addAnswer, addComment, getAnswer } from "../data/api";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import pp from "../media/user.png";
import { upvote, downvote } from "../data/api";

function Answers(props) {
  console.log("answer props", props);
  const itemID = props.itemID;
  const questionID = props.itemID;
  const [user] = useState(JSON.parse(localStorage.getItem("user")) || []);
  const [answerDetails, setAnswerDetails] = useState([]);
  const [clickID, setClickId] = useState(null);
  const [answer, setAnswer] = useState({
    author: user.username,
    post: props.itemID,
    text: "",
  });

  const [comment, setComment] = useState({
    textC: "",
    questionId: "",
    answerId: "",
  });
  const { textC } = comment;

  const { text } = answer;

  const onChange = (e) =>
    setAnswer({ ...answer, [e.target.name]: e.target.value });

  const getCommentData = (e) =>
    setComment({ ...comment, [e.target.name]: e.target.value });

  useEffect(() => {
    getAnswer(itemID).then((response) => {
      if (response.data) {
        const postDate = response.data.createdAt.split("T")[0];
        console.log(postDate);
        setAnswerDetails(response.data);
      }
    });
  }, [answerDetails]);

  console.log("after setting ans 1", answerDetails);
  function submitComment(id) {
    // e.preventDefault();
    const commentD = { textC, questionID, id };
    console.log("comment data", commentD);
    addComment(commentD, user.token).then((response) => {
      if (response.data) {
        console.log("coment added", response.data);
      }
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    console.log("answer", answer, user.token);
    addAnswer(answer, user.token).then((response) => {
      if (response.data) {
        console.log("Answer added", response);
      }
    });
  }

  const renderExpand = ({ type, id }) => {
    setTimeout(() => {
      setClickId(null);
    }, 2000);
    if (type === 1) {
      if (clickID && clickID === id) {
        return (
          <div className={`vote-btns-ani-wrap-up animation-up`}>
            <ExpandLess className="vote-btns" />
            <ExpandLess className="vote-btns" />
          </div>
        );
      } else {
        return <ExpandLess className="vote-btns" />;
      }
    }

    if (type === 0) {
      if (clickID && clickID === id) {
        return (
          <div className={`vote-btns-ani-wrap-down animation-down`}>
            <ExpandMore className="vote-btns" />
            <ExpandMore className="vote-btns" />
          </div>
        );
      } else {
        return <ExpandMore className="vote-btns" />;
      }
    }
  };

  const trigVote = ({ id, direction }) => {
    setClickId(id + direction);
    const voteData = {
      answer: id,
      post: itemID,
    };
    direction === "up"
      ? upvote(voteData, user.token).then((response) => {
          if (response.data) {
            console.log("upvoted", response);
          }
        })
      : downvote(voteData, user.token).then((response) => {
          if (response.data) {
            console.log("downVoted", response);
          }
        });
  };

  return (
    <div className="answer">
      <form className="form">
        <div>
          <h5>
            <b>Answers</b>
          </h5>
          {answerDetails &&
            answerDetails.map((answer, index) => {
              return (
                <div className="answerDetail" key={index}>
                  <div className="answer-wrap">
                    <div className="answerVotes">
                      <div className="vote-box">
                        <div className="vote-box-inner">
                          <Button
                            className="height"
                            onClick={(e) => {
                              trigVote({ id: answer.id, direction: "up" });
                            }}
                          >
                            {renderExpand({ type: 1, id: answer.id + "up" })}
                          </Button>
                        </div>
                        <span>
                          <h2>{answer.score}</h2>
                        </span>
                        <div className="vote-box-inner">
                          <Button
                            className="height"
                            onClick={(e) => {
                              trigVote({ id: answer.id, direction: "down" });
                            }}
                          >
                            {renderExpand({ type: 0, id: answer.id + "down" })}
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="answerMain">
                      <div className="answerDetails">
                        <p>{answer.text}</p>
                      </div>
                    </div>
                  </div>

                  <div className="answer-section">
                    <div className="answer-utils">
                      {/* <Link to="/" className="btn btn-primary1"> */}
                      <h3>Edit</h3>
                      {/* </Link> */}
                    </div>
                    <div className="answer-author">
                      <div className="answer-time">{answer.createdAt}</div>
                      <div className="answer-profile">
                        <span className="answer-profile-pp">
                          <img src={pp} alt="" />
                        </span>
                        <span className="answer-profile-name">
                          {answer.author} Constant Ans Author
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* comment section */}
                  <div className="comment-displayed">
                    <div className="single-comment">
                      {answer.comment &&
                        answer.comment.map((coment, i) => {
                          return (
                            <>
                              <div className="coment-text" key={i}>
                                <p className="texts">{coment.text}</p>
                                <p className="comment-author">
                                  -{coment.author}Constant Coment author at
                                  <i className="coment-time">
                                    {`  ${coment.createdAt}`}
                                  </i>
                                </p>
                              </div>
                            </>
                          );
                        })}
                    </div>
                  </div>

                  {/* Comments here */}
                  <div className="comment-section">
                    <div className="">
                      <p>
                        <a
                          class="btn btn-primary"
                          data-toggle="collapse"
                          href={`#commentID${answer.id}`}
                          role="button"
                          aria-expanded="true"
                          aria-controls="collapseExample"
                        >
                          Comment here..
                        </a>
                      </p>
                      <div class="collapse" id={`commentID${answer.id}`}>
                        <div class="card card-body">
                          <textarea
                            name="textC"
                            rows="6"
                            cols="80"
                            placeholder="Enter your Comments here....."
                            value={textC}
                            onChange={(e) => getCommentData(e)}
                          />
                          <button
                            className="btn btn-primary1"
                            variant="primary"
                            onClick={() => submitComment(answer.id)}
                          >
                            Comment
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

          <textarea
            name="text"
            id="post-answer"
            rows="6"
            cols="80"
            placeholder="Enter your answers here....."
            value={text}
            onChange={(e) => onChange(e)}
          />

          <button className="btn btn-primary1" onClick={(e) => onSubmit(e)}>
            Post Answer
          </button>
        </div>
      </form>
    </div>
  );
}

export default Answers;
