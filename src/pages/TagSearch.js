import React, {useState, useEffect} from "react";
import "font-awesome/css/font-awesome.min.css";

function TagSearch() {
  const [searchtext, setSearchText] = useState("");
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
        <form class="d-flex">
          <input
            className="form-control me-2 taginput-search"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={(event) => {
              setSearchText({
                searchtext: event.target.value,
              });
              console.log("searchTag",searchtext)
            }}
          />
          <button className="btn btn-outline-success btn-tag" type="submit">
            Search
          </button>
        </form>
      </div>
      <div className="view-tag">
        <div className="row">
          <div className="col-2">
            <div class="card" style={{ width: "18rem;" }}>
              <div class="card-body">
                <h5 class="card-title">Javascript</h5>
                <a href="/" class="btn btn-primary">
                  See More..
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TagSearch;
