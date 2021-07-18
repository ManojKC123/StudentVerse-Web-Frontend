import React from "react";
import { Link } from "react-router-dom";
import TagListing from "./TagListing";

const Posts = () => {
  const answerVoteUp = (
    <div className="vote answer">
      <span className="vote-count fc-green-500">{answer_count}</span>
      <div className="count-text">answers</div>
    </div>
  );

  const answerVoteDown = (
    <div className="vote">
      <span className="vote-count">{answer_count}</span>
      <div className="count-text">answers</div>
    </div>
  );

  return (
    <div className="posts">
      <div className="stats-container fc-black-500">
        <div className="stats">
          <div className="vote">
            <span className="vote-count">{answers_count ? 1 : 0}</span>
            <div className="count-text">Answers</div>
          </div>
          <div className="vote">
            <span className="vote-count">{tags_count ? 1 : 0}</span>
            <div className="count-text">tags</div>
          </div>
          <div className="vote">
            <div className="count-text">{views_count ? 1 : 0} views</div>
          </div>
        </div>
      </div>
      <div className="summary">
        <h3>
          <Link to={`/questions/${id}`}>{title}</Link>
        </h3>
        <div className="brief"> {postItem_brief}</div>
        <TagListing tag_name={tagname} size={"s-tag"} float={"left"} />
      </div>
    </div>
  );
};

export default Posts;
