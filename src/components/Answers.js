import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { addAnswer,  getAnswer } from "../data/api";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import pp from "../media/user.png";

function Answers(props) {
  const itemID = props.itemID;
  const [user] = useState(JSON.parse(localStorage.getItem("user")) || []);
  const [postDetail, setPostDetail] = useState([]);
  const [answerDetails, setAnswerDetails, comments] = useState([]);

  const [answer, setAnswer] = useState({
    author: user.username,
    post: props.itemID,
    text: "",
    votes: "",
    comment: "",
    score: "",
  });
  const { text, post, votes, comment, score } = answer;
  
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
    console.log("answer", answer,user.token);
    addAnswer(answer, user.token).then((response) => {
      if (response.data) {
        console.log("Answer added", response.data);
      }
    });
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
                        <span>
                          <ExpandLess />
                        </span>
                        <span>
                          <span>Vote</span>
                        </span>
                        <span>
                          <ExpandMore />
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
                  <div className="comment-section">
                    {comments &&
                      comments.map((comment, index) => {
                        return (
                          <div className="comments" >
                            <p>{comments}</p>
                            {/* <span>
                              {comment_author} at {comment_date_time}
                            </span> */}
                          </div>
                        );
                      })}

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
            id="answers"
            rows="6"
            cols="80"
            placeholder="Enter your answers here....."
            value={text}
            onChange={(e) => onChange(e)}
          ></textarea>

          <button className="btn btn-primary1" id="addAnswerTest"type="submit">
            Post Answer
          </button>
        </div>
      </form>
    </div>
  );
}

export default Answers;