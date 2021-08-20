import React, { useState } from "react";
import AddQuiz from '../../components/admin-components/AddQuiz';

function AdminQuiz(props) {
  const [user] = useState(JSON.parse(localStorage.getItem("user")) || []);

  return (
    <>
      <div className="quiz-page"> 
      <AddQuiz/>
      
      </div>
    </>
  );
}

export default AdminQuiz;
