import React from "react";
import { Link } from "react-router-dom";

const TagListing = ({ tag_names, size, display, float, link, href }) => {
  return (
    <div className="tags-badge" style={{ display, float }}>
      <span>Tags:</span>
      {tag_names.map((tag_name, index) => (
        <Link
          className={`${size}`}
          key={index}
          to={link ? link : `/tags/${tag_name}`}
        >
          {tag_name}
        </Link>
      ))}
    </div>
  );
};

export default TagListing;
