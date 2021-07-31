import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { getSingleQuestion } from "../data/api";

function QuestionDetail(props) {
  const itemID = props.itemID;
  const [postDetail, setPostDetail] = useState([]);
  const [postDetdate, setPostDetDate] = useState("");

  useEffect(() => {
    getSingleQuestion(itemID).then((response) => {
      if (response.data) {
        setPostDetail(response.data);
        const postDet =
          response.data.createdAt.substring(0, 19).split("T")[0] +
          " / " +
          response.data.createdAt.substring(0, 19).split("T")[1];
        setPostDetDate(postDet);
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
                Asked on {postDetdate}
                {/* {postDetail.createdAt} */}
                {/* {postDetail.createdAt.substring(0, 19)} */}
                {/* {`${postDetail.createdAt.substring(0, 19).split("T")[0]}  / `}
                  {postDetail.createdAt.substring(0, 19).split("T")[1]} */}
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
