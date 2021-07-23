import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSingleQuestion, addAnswer } from "../data/api";

function SingleQuestion(props) {
  const itemID = props.match.params.id;
  const [user] = useState(JSON.parse(localStorage.getItem("user")) || []);
  const [postDetail, setPostDetail] = useState([]);
  const [answer, setAnswer] = useState({
    author: user.username,
    post: props.match.params.id,
    text: "",
    votes: "",
    comment: "",
    score: "",
  });

  const { text, post, votes, comment, score } = answer;
  const onChange = (e) =>
    setAnswer({ ...answer, [e.target.name]: e.target.value });

  useEffect(() => {
    getSingleQuestion(itemID).then((response) => {
      if (response.data) {
        setPostDetail(response.data);
        console.log("posts", response);
        const postDate = response.data.createdAt.split("T")[0];
        console.log("posts", postDate);
      }
    });
  }, []);

  function onSubmit(e) {
    e.preventDefault();
    console.log("answer", answer, user.token);
    addAnswer(answer, user.token).then((response) => {
      if (response.data) {
        console.log("Answer added", response.data);
      }
    });
  }

  return (
    <div id="home-section" className="homepage">
      <Grid container>
        <Grid item xs={2} md={2} className=""></Grid>
        <Grid item xs={8} md={8} className="">
          <div className="questions-grid">
            <h3 className="questions-headline">Top Questions</h3>
            <div className="questions-btn">
              <Link to="/ask-question" className="btn btn-primary1">
                Ask Question
              </Link>
            </div>
          </div>

          <div className="row align-items-start">
            <div className="col-3">
              <div className="stats">
                <div className="vote">
                  <span className="vote-count">2</span>
                  <div className="count-text">Answers</div>
                </div>
                <div className="vote">
                  <span className="vote-count">4</span>
                  <div className="count-text">tags</div>
                </div>
                <div className="vote">
                  <div className="count-text">5 views</div>
                </div>
              </div>
            </div>
            <div className="col-9">
              <div className="row">
                <p>{postDetail.title}</p>
                <p>
                  Asked on <span>{postDetail.createdAt}</span>
                </p>
              </div>
              <div className="row">
                <p>{postDetail.body}</p>
              </div>
              <div className="row">
                {postDetail.tags &&
                  postDetail.tags.map((tag, index) => {
                    return (
                      <span className="singleQueTag" key={index}>
                        {tag}
                      </span>
                    );
                  })}
              </div>
              {/* comment section */}
              <div className="comment-section">
                <div className="row">
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

            <div className="answer">
              <form className="form" onSubmit={(e) => onSubmit(e)}>
                <div>
                  <h5>
                    <b>Answers</b>
                  </h5>
                  <h6>
                    <b>Your Answers</b>
                  </h6>
                  <textarea
                    name="text"
                    rows="6"
                    cols="80"
                    placeholder="Enter your answers here....."
                    value={text}
                    onChange={(e) => onChange(e)}
                  ></textarea>

                  <button class="btn btn-primary1" type="submit">
                    Post Answer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Grid>
        <Grid item xs={2} md={2} className="">
          <div className="card">
            <div className="card-header">
              <b>The Overflow Blog</b>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                Tales from documentation: Write for your clueless user
              </li>
              <li className="list-group-item">
                Podcast 252: a conversation on diversity
              </li>
            </ul>
            <div className="card-header">
              <b>Upcoming Events</b>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                2021 Community Moderator Election ends in 7 days
              </li>
              <li className="list-group-item">
                2021 Community Moderator Election ends in 7 days
              </li>
            </ul>
            <div className="card-header">
              <b>Features</b>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Login and SignUp</li>
              <li className="list-group-item">Ask question and post answer</li>
              <li className="list-group-item">Tags, Vote, Users and Comment</li>
              <li className="list-group-item">Quiz and Study materials</li>
            </ul>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default SingleQuestion;
