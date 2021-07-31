import { Grid } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import Answers from "../components/Answers";
import QuestionDetail from "../components/QuestionDetail";

function SingleQuestion(props) {
  const itemID = props.match.params.id;

  return (
    <div id="" className="questions-page">
      <Grid container>
        <Grid item md={2} className=""></Grid>
        <Grid item md={8} className="">
          <div className="questions-grid-wrap">
            <div className="questions-grid">
              <h3 className="questions-headline">Top Questions</h3>
              <div className="questions-btn">
                <Link to="/ask-question" className="btn btn-primary1">
                  Ask Question
                </Link>
              </div>
            </div>
            <QuestionDetail itemID={itemID} />
            <Answers itemID={itemID} />
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
