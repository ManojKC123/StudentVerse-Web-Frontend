import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import Posts from "../components/Posts";
import { fetchSearchPosts } from "../data/api";
import { connect } from "react-redux";
import { setSearchPosts } from "../redux/actions/searchActions";
import NOtFound from "../media/user.png";

function SearchResults(props) {
  const [user] = useState(JSON.parse(localStorage.getItem("user")) || []);
  const [posts, setPosts] = useState([]);
  const propsTitle = props.match.params.title;
  const [color, setColor] = useState("");

  useEffect(() => {
    fetchSearchPosts(propsTitle)
      .then((response) => {
        console.log("searchposts res", response.data);
        if (response.data.length > 0) {
          setPosts(response.data);
          props.setSearchPosts(response.data);
        }
        if (response.data.length === 0) {
          console.log("search posts res null", response.data);
        }
      })
      .catch((err) => {
        console.log("fetch error search-posts", err);
        // notification for search posts
      });
  }, []);

  return (
    <div className="search-results-page">
      <Grid container>
        <Grid item md={12} className="">
          <div className="search-results-header">
            <div className="results-head-top">
              <div className="results-for">
                <h2>Results for {propsTitle}</h2>
              </div>
              <div className="results-sd">
                {posts.length > 0 ? (
                  ""
                ) : (
                  <>
                    Results not found for {`${propsTitle} `}
                    <Link
                      to={user.token ? "/ask-question" : "/login"}
                      className="btn btn-primary"
                    >
                      Ask Question
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="results-head-bottom">
              <div className="reults-total">
                Total {posts.length} posts related found
              </div>
              <div className="results-sort-wrap">
                Sort by
                <Link to="/" className="button-style">
                  Number of answer
                </Link>
                <Link href="" className="button-style">
                  Votes
                </Link>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item md={12} className="">
          <div className="search-results-item">
            {posts.length > 0 ? (
              <>
                {posts.map((post) => (
                  <Posts key={post.id} post={post} color={color} />
                ))}
              </>
            ) : (
              <div className="results-not-found">
                <div className="contatiner">
                  <div className="not-found-text">
                    Results not found for {`${propsTitle}, Try `}
                    <Link
                      to={user.token ? "/ask-question" : "/login"}
                      className="btn btn-primary"
                    >
                      Asking Question
                    </Link>
                  </div>
                  <div className="not-found-img-wrap">
                    <img src={NOtFound} alt="Results not found" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
const mapDispatchToProps = {
  setSearchPosts,
};

const mapStateTOProps = (state) => {
  return {
    posts: state.searchReducer.searchPosts,
  };
};

export default connect(mapStateTOProps, mapDispatchToProps)(SearchResults);
