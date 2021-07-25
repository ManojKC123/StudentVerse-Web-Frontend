import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { getSingleQuestion } from "../data/api";

function QuestionDetail(props) {
  const itemID = props.itemID;
  const [user] = useState(JSON.parse(localStorage.getItem("user")) || []);
  const [postDetail, setPostDetail] = useState([]);

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
  return (
    <div>
      <Grid container>
        <Grid item md={3} className="">
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
        </Grid>
        <Grid item md={8} className="">
          <div className="">
            <div className="">
              <p>{postDetail.title}</p>
              <p>
                Asked on <span>{postDetail.createdAt}</span>
              </p>
            </div>
            <div className="">
              <p>{postDetail.body}</p>
            </div>
            <div className="">
              {postDetail.tags &&
                postDetail.tags.map((tag, index) => {
                  return (
                    <span className="singleQueTag" key={index}>
                      {tag}
                    </span>
                  );
                })}
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default QuestionDetail;
