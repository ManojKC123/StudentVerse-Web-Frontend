import React, { useState, useEffect } from "react";
import axios from "axios";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { Link } from "react-router-dom";
import Posts from "../components/Posts";
import { getTopPosts } from "../data/api";

const Home = () => {
  useEffect(() => {
    getTopPosts();
  }, []);

  return (
    <div id="mainbar" className="homepage fc-black-800">
      <div className="questions-grid">
        <h3 className="questions-headline">Top Questions</h3>
        <div className="questions-btn">
          <Link to="/ask-question">Ask Question</Link>
        </div>
      </div>
      <div className="questions">
        {/* {posts.map((post) => ( */}
        <Posts />
        {/* ))} */}
      </div>
    </div>
  );
};

export default Home;
