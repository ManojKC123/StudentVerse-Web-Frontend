import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TagListing from "./TagListing";

const Posts = (props) => {
  let post = props.post;
  const [color, setColor] = useState(props.color);

  useEffect(() => {
    setColor("yellow");
    console.log("yellow set");
    setTimeout(() => {
      setColor("");
      console.log("yellow null");
    }, 3000);
  }, []);
  console.log("color", props.color);

  return (
    <div className="posts">
      <div className="stats-container fc-black-500">
        <div className="stats">
          <div className="vote">
            <span className="vote-count">{post.answer.length ?? 3}</span>
            <div className="count-text">Answers</div>
          </div>
          <div className="vote">
            <span className="vote-count">{post.tags.length ?? 3}</span>
            <div className="count-text">tags</div>
          </div>
          <div className="vote">
            <div className="count-text">{post.views ?? 3} views</div>
          </div>
        </div>
      </div>
      <div className="summary">
        <h3>
          <Link to={`/questions/${post._id}`}>{post.title}</Link>
        </h3>
        <div className="brief"> {post.body}</div>
        <TagListing tag_names={post.tags} float={"left"} />
      </div>
    </div>
  );
};

export default Posts;
