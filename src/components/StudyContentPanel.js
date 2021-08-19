import React, { useState, useEffect, useRef } from "react";
import { addQuestion } from "../data/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StudyChapters from "../pages/StudyChapters";

toast.configure();

function StudyContentPanel() {
  const [user] = useState(JSON.parse(localStorage.getItem("user")) || []);
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    tags: [],
  });

  // useEffect(() => {}, [tags]);

  // const onChange = (e) =>
  //   setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    // e.preventDefault();
  };
  return (
    <div className="askForm">
      <form onSubmit={(e) => onSubmit(e)}>
        <label className="form-label s-label">
          <b>Title</b>
          <p className="title-desc fw-normal fs-caption">
            Be specific and imagine you’re asking a question to another person
          </p>
        </label>
      </form>
    </div>
  );
}

export default StudyContentPanel;
