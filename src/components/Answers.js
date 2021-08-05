import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { addAnswer, addComment, getAnswer } from "../data/api";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import pp from "../media/user.png";
import { upvote, downvote } from "../data/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function Answers(props) {
  const itemID = props.itemID;
  const questionID = props.itemID;
  const [user] = useState(JSON.parse(localStorage.getItem("user")) || []);
  const [answerDetails, setAnswerDetails] = useState([]);
  const [clickID, setClickId] = useState(null);
  const [voteDependency, setVoteDependency] = useState("voteNull");

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
        console.log("answer det", response.data);

        setAnswerDetails(response.data);
        console.log("answer det", answerDetails);
      }
    });
  }, [voteDependency]);

  function submitComment(id) {
    // e.preventDefault();
    const commentD = { textC, questionID, id };
    addComment(commentD, user.token).then((response) => {
      if (response.data) {
        toast.success(response.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    addAnswer(answer, user.token).then((response) => {
      if (response.data) {
        toast.success(response.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
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
            setVoteDependency("VoteUp");
            toast.success("Answer Upvoted !!!", {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          }
        })
      : downvote(voteData, user.token).then((response) => {
          if (response.data) {
            setVoteDependency("voteDown");
            toast.error("Answer DownVoted !!!", {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
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
                      {/* Edit */}
                      {/* </Link> */}
                    </div>
                    <div className="answer-author">
                      <div className="answer-time">
                        {`${
                          answer.createdAt.substring(0, 19).split("T")[0]
                        }  / `}
                        {answer.createdAt.substring(0, 19).split("T")[1]}
                      </div>
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
                                  -{`${coment.author}ConstantComentAuthor at `}
                                  <i className="coment-time">
                                    {`${
                                      coment.createdAt
                                        .substring(0, 19)
                                        .split("T")[0]
                                    }  / `}
                                    {
                                      coment.createdAt
                                        .substring(0, 19)
                                        .split("T")[1]
                                    }
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
                          <b>Comment here</b>
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
                            <b>Comment</b>
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

          <button
            id="addAnswer"
            className="btn btn-primary1"
            onClick={(e) => onSubmit(e)}
          >
            <b>Post Answer</b>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Answers;
