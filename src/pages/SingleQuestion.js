import { Grid } from "@material-ui/core";
import React, { useState, useEffect, Form } from "react";
import { Link } from "react-router-dom";
import { getSingleQuestion } from "../data/api";

function SingleQuestion(props) {
  const itemID = props.match.params.id;
  const [post, setPost] = useState([]);
  useEffect(() => {
    getSingleQuestion(itemID).then((response) => {
      if (response.data) {
        setPost(response.data);
        console.log("posts", response.data);
        // const pp = post.createdAt.split(" ");
        // console.log("posts", pp);
      }
    });
  }, []);

  return (
    <div id="home-section" className="homepage">
      <Grid container>
        <Grid item xs={2} md={2} className=""></Grid>
        <Grid item xs={9} md={9} className="">
          <div className="questions-grid">
            <h3 className="questions-headline">Top Questions</h3>
            <div className="questions-btn">
              <Link to="/ask-question" className="btn btn-primary">
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
                <p>{post.title}</p>
                <p>
                  Asked on <span>{post.createdAt}</span>
                </p>
              </div>
              <div className="row">
                <p>{post.body}</p>
              </div>
              <div className="row">
                {post.tags &&
                  post.tags.map((tag, index) => {
                    return (
                      <span className="singleQueTag" key={index}>
                        {tag}
                      </span>
                    );
                  })}
              </div>
              <div className="row user-cmt">
                <h5>Comment</h5>
              </div>
              <div className="row">
                <p>User comment</p>
              </div>
              <div className="row">
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="1"
                />
                <button className="btn-cmt" variant="primary" type="submit">
                  Comment
                </button>
              </div>
            </div>
          </div>

          <div className="answer"></div>
        </Grid>
        <Grid item xs={2} md={2} className=""></Grid>
      </Grid>
    </div>
  );
}

export default SingleQuestion;
