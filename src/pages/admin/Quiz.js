import React, { useState } from "react";

function Quiz(props) {
  const [user] = useState(JSON.parse(localStorage.getItem("user")) || []);

  return (
    <>
      <div
        className={
          user.userType === "Admin" ? "page-content quiz-page" : "quiz-page"
        }
      >
        Quiz page
      </div>
    </>
  );
}

export default Quiz;
