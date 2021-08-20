import React, { useState } from "react";

function AdminQuiz(props) {
  const [user] = useState(JSON.parse(localStorage.getItem("user")) || []);

  return (
    <>
      <div className="quiz-page"> admin Quiz page</div>
    </>
  );
}

export default AdminQuiz;
