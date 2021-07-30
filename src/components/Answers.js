import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { addAnswer, getAnswer } from "../data/api";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import pp from "../media/user.png";
import { upvote, downvote } from "../data/api";

function Answers(props) {
  const itemID = props.itemID;
  const [user] = useState(JSON.parse(localStorage.getItem("user")) || []);
  const [postDetail, setPostDetail] = useState([]);
  const [answerDetails, setAnswerDetails] = useState([]);
  const [clickID, setClickId] = useState(null);
  const [answer, setAnswer] = useState({
    author: user.username,
    post: props.itemID,
    text: "",
    votes: "",
    comment: "",
    score: "",
  });
  const { text } = answer;

  const onChange = (e) =>
    setAnswer({ ...answer, [e.target.name]: e.target.value });

  useEffect(() => {
    getAnswer(itemID).then((response) => {
      if (response.data) {
        setAnswerDetails(response.data);
        console.log("answer-details id", response.data);
        // const postDate = response.data.createdAt.split("T")[0];
      }
    });
  }, [answerDetails, itemID]);
  console.log("answer-details abcd", answerDetails);

  function onSubmit(e) {
    e.preventDefault();
    console.log("answer", answer, user.token);
    addAnswer(answer, user.token).then((response) => {
      if (response.data) {
        console.log("Answer added", response.data);
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
      <form className="form" onSubmit={(e) => onSubmit(e)}>
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
                      <Link to="/" className="btn btn-primary1">
                        Edit
                      </Link>
                    </div>
                    <div className="answer-author">
                      <div className="answer-time">answered 5 mins ago</div>
                      <div className="answer-profile">
                        <span className="answer-profile-pp">
                          <img src={pp} alt="" />
                        </span>
                        <span className="answer-profile-name">
                          Mandeep Maharjan
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* comment section */}
                  <div className="comment-section">
                    {/* comements here */}

                    <div className="comment-box">
                      <h5>Comment</h5>
                      <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="1"
                        name="comment"
                        placeholder="Leave a comment"
                      />
                      <button
                        className="btn btn-primary1"
                        variant="primary"
                        id="addCommentTest"
                      >
                        Comment
                      </button>
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
          ></textarea>

          <button className="btn btn-primary1" id="addAnswer" type="submit">
            Post Answer
          </button>
        </div>
      </form>
    </div>
  );
}

export default Answers;
