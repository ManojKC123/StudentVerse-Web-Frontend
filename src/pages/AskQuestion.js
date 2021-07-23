import React from "react";
import AskForm from "../components/AskForm";

function AskQuestion() {
  return (
    <div className="post-form-container">
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
