import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import Posts from "../components/Posts";
import { fetchSearchPosts } from "../data/api";

function SearchResults(props) {
  const [user] = useState(JSON.parse(localStorage.getItem("user")) || []);
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {}, []);

  const searchPosts = (tags) => {
    fetchSearchPosts(title.title)
      .then((response) => {
        if (response.length > 0) {
          setPosts(response.data);
          props.setSearchTags(response);
        }
        if (response.length === 0) {
          console.log("search posts res null", response);
        }
      })
      .catch((err) => {
        console.log("fetch error search-posts", err);
        // notification for search posts
      });
  };

  const questionAsked = "React";
  const totalPosts = 30;

  return (
    <div className="search-results-page">
      <Grid container>
        <Grid item md={12} className="">
          <div className="search-results-header">
            <div className="results-head-top">
              <div className="results-for">
                <h2>Results for {questionAsked}</h2>
              </div>
              <div className="results-sd">
                Results not found
                <Link
                  to={user.token ? "/ask-question" : "/login"}
                  className="btn btn-primary"
                >
                  Ask Question
                </Link>
              </div>
            </div>
            <div className="results-head-bottom">
              <div className="reults-total">
                Total {totalPosts} posts related found
              </div>
              <div className="results-sort-wrap">Sort by</div>
            </div>
          </div>
        </Grid>
        <Grid item md={12} className="">
          <div className="search-results-item">
            {posts.map((post) => (
              <Posts key={post.id} post={post} />
            ))}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default SearchResults;
