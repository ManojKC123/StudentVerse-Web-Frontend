import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { addAnswer, getAnswer } from "../data/api";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import pp from "../media/user.png";

function Answers(props) {
  const itemID = props.itemID;
  const [user] = useState(JSON.parse(localStorage.getItem("user")) || []);
  const [answerDetails, setAnswerDetails] = useState([]);
  const [voteAnimation, setVoteAnimation] = useState(false);
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
        console.log("answer-details", response);
        // const postDate = response.data.createdAt.split("T")[0];
      }
    });
  }, []);
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

  function animateVoteBtn(e) {
    setVoteAnimation(true);
  }
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
                            className="btn-vote-trigger"
                            onClick={animateVoteBtn}
                          >
                            <ExpandLess className="vote-btns" />
                          </Button>
                          <div
                            className={
                              !voteAnimation
                                ? "vote-btns-ani-wrap none"
                                : "vote-btns-ani-wrap"
                            }
                          >
                            <ExpandLess className="vote-btns" />
                            <ExpandLess className="vote-btns" />
                          </div>
                        </div>
                        <span>
                          <span>Vote</span>
                        </span>
                        <span>
                          <ExpandMore className="vote-buttons" />
                        </span>
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
                  {/* Comments here */}
                  <div className="comment-section">
                    <div className="">
                      <h5>Comment</h5>
                      <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="1"
                      />
                      <button
                        className="btn btn-primary1"
                        variant="primary"
                        type="submit"
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
            rows="6"
            cols="80"
            placeholder="Enter your answers here....."
            value={text}
            onChange={(e) => onChange(e)}
          ></textarea>

          <button className="btn btn-primary1" type="submit">
            Post Answer
          </button>
        </div>
      </form>
    </div>
  );
}

export default Answers;
