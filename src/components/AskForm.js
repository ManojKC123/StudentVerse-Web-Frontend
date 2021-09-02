import React, { useState, useEffect, useRef } from "react";
import { addQuestion } from "../data/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function AskForm() {
  const [user] = useState(JSON.parse(localStorage.getItem("user")) || []);
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    tags: [],
  });
  const [tags, setTags] = useState([]);
  const [currentTagText, setCurrentTagText] = useState("");
  const inputRef = useRef(null);

  const { title, body } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleTag = (e) => {
    setCurrentTagText(e.target.value);
    if (e.keyCode === 13 && currentTagText) {
      setTags((prevTags) => [...prevTags, currentTagText]);
      setCurrentTagText("");
    } else if (e.keyCode === 32 && currentTagText) {
      setTags((prevTags) => [...prevTags, currentTagText]);

      setCurrentTagText("");

      e.target.value = null;
    }

    let box = document.querySelector(".stackTags");
    let width = box.clientWidth;
    const addedWidth = width + 10;
    document.getElementById("tag-input").style.paddingLeft = `${addedWidth}px`;
  };

  const removeTag = (index) => {
    const newTagArray = tags;
    newTagArray.splice(index, 1);
    setTags([...newTagArray]);

    let box = document.querySelector(".stackTags");
    let width = box.clientWidth;
    const addedWidth = width + 10;
    document.getElementById("tag-input").style.paddingLeft = `${addedWidth}px`;
    inputRef.current.focus();
  };

  useEffect(() => {}, [tags]);

  const onSubmit = async (e) => {
    e.preventDefault();

    tags.map((tag, index) => formData.tags.push(tags[index].trim()));

    addQuestion(formData, user.token).then((response) => {
      if (response.success === true) {
        toast.success(response.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
      if (response.success === false) {
        toast.error(response.error[0].msg, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }

      setFormData({
        title: "",
        body: "",
        tags: [],
      });
      setTags([]);
    });
  };

  return (
    <div className="askForm">
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="question-form p16 s-card">
          <div className="question-layout">
            <div className="title-grid">
              <label className="form-label s-label">
                <b>Title</b>
                <p className="title-desc fw-normal fs-caption">
                  Be specific and imagine you’re asking a question to another
                  person
                </p>
              </label>
              <input
                className="title-input s-input"
                type="text"
                name="title"
                value={title}
                onChange={(e) => onChange(e)}
                id="title"
                placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
                required
              />
            </div>
            <div className="body-grid">
              <label className="form-label s-label fc-black-800">
                <b>Body</b>
                <p className="body-desc fw-normal fs-caption fc-black-800">
                  Include all the information someone would need to answer your
                  question
                </p>
              </label>
              <div className="s-textarea rich-text-editor-container"></div>
              <textarea
                className="s-textarea"
                name="body"
                cols="30"
                rows="12"
                value={body}
                onChange={(e) => onChange(e)}
                placeholder="Enter body with minimum 30 characters"
                id="body"
                required
              />
            </div>

            <div className="tag-grid">
              <label className="form-label s-label">
                <b>Tag Name</b>
                <p className="tag-desc fw-normal fs-caption">
                  Add up to 5 tags to describe what your question is about
                </p>
              </label>

              <div className="masterStackDiv">
                <div className="stackInput-wrap">
                  <div
                    className="stackTags"
                    style={{ display: tags.length > 0 ? "flex" : "none" }}
                  >
                    {tags.map((tag, index) => {
                      return (
                        <div className="stackTag">
                          {tag}
                          <button
                            onClick={() => removeTag(index)}
                            className="tagCloseBtn"
                          >
                            {/* <Clear /> */} &times;
                          </button>
                        </div>
                      );
                    })}
                  </div>
                  <input
                    type="text"
                    className="tag-input"
                    onKeyDown={handleTag}
                    onChange={handleTag}
                    value={currentTagText}
                    id="tag-input"
                    placeholder="e.g. (ajax django string)"
                    required
                    ref={inputRef}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="post-button mt32">
          <button
            className="btn-primary post-form"
            id="submit-button"
            name="submit-button"
            type="submit"
          >
            <b>Ask question</b>
          </button>
        </div>
      </form>
    </div>
  );
}

export default AskForm;
