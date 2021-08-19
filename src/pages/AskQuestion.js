import React, { useState, useEffect } from "react";
import AskForm from "../components/AskForm";

function AskQuestion() {
  const [user] = useState(JSON.parse(localStorage.getItem("user")) || []);

  return (
    <div className="">
      <div className="post-form-content">
        <div className="post-form-header">
          <div className="post-form-headline">
            <h1>What are you confused on?</h1>
          </div>
        </div>
        <div className="post-form-section">
          <div className="postform">
            <AskForm />
          </div>
          <aside>
            <div className="right-panel">{/* <AskWidget /> */}</div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default AskQuestion;
