import React, { useState } from "react";

function UserQuiz(props) {
  const [user] = useState(JSON.parse(localStorage.getItem("user")) || []);

  return (
    <>
      <div className="quiz-page">Quiz page user</div>
    </>
  );
}

export default UserQuiz;
