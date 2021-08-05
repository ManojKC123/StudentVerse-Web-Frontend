import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Posts from "../components/Posts";
import { getTopPosts } from "../data/api";

const Home = () => {
  const [user] = useState(JSON.parse(localStorage.getItem("user")) || []);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getTopPosts().then((response) => {
      if (response.data) {
        setPosts(response.data);
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
            <Link
              to={user.token ? "/ask-question" : "/login"}
              className="btn btn-primary"
            >
              Ask Question
            </Link>
          </div>
          <div className="questions">
            {posts.map((post) => (
              <Posts key={post.id} post={post} />
            ))}
          </div>
        </Grid>
        <Grid item xs={2} md={2} className=""></Grid>
      </Grid>
    </div>
  );
};

export default Home;
