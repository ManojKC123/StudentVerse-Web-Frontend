import React, { useState, useEffect } from "react";
import { fetchSearchTags } from "../data/api";
import { connect } from "react-redux";
import { setSearchTags } from "../redux/actions/searchActions";

function TagSearch(props) {
  const [tags, setTags] = useState("");
  const [tagsStore, setTagStore] = useState([]);

  useEffect(() => {}, []);

  const searchTags = (tags) => {
    fetchSearchTags(tags.tags)
      .then((response) => {
        console.log("tagsres", response);
        if (response.success === true && response.data.length > 0) {
          setTagStore(response.data);
          props.setSearchTags(response.data);
        }
        if (response.data.length > 0) {
          console.log("response nul", response);
        }
      })
      .catch((err) => {
        console.log("fetch error search-tags", err);
        // notification for search tags
      });
  };

  return (
    <div className="search-tag">
      <div className="tag-heading">
        <h3>Tags</h3>
        <p className="tag-que">What is tag?</p>
        <p className="tag-ans">
          A tag is a keyword or label that categorizes your question with other,
          similar questions. Using the right tags <br /> makes it easier for
          others to find and answer your question.
        </p>
      </div>

      <div className="tagsearch-section">
        <input
          className="form-control me-2 taginput-search"
          type="text"
          id="tag"
          placeholder="Enter Search Tags"
          onChange={(event) => {
            setTags({
              tags: event.target.value,
            });
          }}
        />
        <button
        id="tag-button"
          onClick={() => searchTags(tags)}
          className="btn btn-outline-success btn-tag"
        >
          Search
        </button>
      </div>

      <div className="view-tag">
        {tagsStore &&
          tagsStore.map((tagm, index) => {
            return (
              <>
                {/* <span>{tags[0]}</span> */}
                {tagm.tags &&
                  tagm.tags.map((tagEach, index) =>
                    // return console.log(tagEach.includes(tags));
                    tagEach.includes(tags.tags) ? (
                      <div class="card" style={{ width: "18rem;" }}>
                        <div class="card-body">
                          <a href="/" class="btn btn-primary">
                            <span class="card-title">{tagEach}</span>
                          </a>
                          <p> 30 questions asked on this tag </p>
                        </div>
                      </div>
                    ) : (
                      " "
                    )
                  )}
              </>
            );
          })}
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  setSearchTags,
};

const mapStateTOProps = (state) => {
  return {
    tagsStore: state.searchReducer.searchTags,
  };
};

export default connect(mapStateTOProps, mapDispatchToProps)(TagSearch);
// export default TagSearch;
