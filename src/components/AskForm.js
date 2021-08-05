import React, { useState, useEffect } from "react";
import { addQuestion } from "../data/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function AskForm() {
  const [user] = useState(JSON.parse(localStorage.getItem("user")) || []);
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    tagname: [],
  });
  const [currentTagText, setCurrentTagText] = useState("");
  const [tags, setTags] = useState([]);

  const { title, body, tagname } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log("tags", tags);

    // addQuestion(formData, user.token).then((response) => {
    //   if (response.data) {
    //     console.log(response);
    //     toast.success(response.message, {
    //       position: toast.POSITION.BOTTOM_RIGHT,
    //     });
    //   }
    // });

    // setFormData({
    //   title: "",
    //   body: "",
    //   tagname: "",
    // });
  };

  const handleTag = (e) => {
    setCurrentTagText(e.target.value);
    if (e.keyCode == 13 && currentTagText) {
      setTags((prevTags) => [...prevTags, currentTagText]);
      setCurrentTagText("");
    } else if (e.keyCode == 32 && currentTagText) {
      setTags((prevTags) => [...prevTags, currentTagText]);
      setCurrentTagText("");
    }
  };
  const removeTag = (index) => {
    const newTagArray = tags;
    newTagArray.splice(index, 1);
    setTags([...newTagArray]);
  };

  return (
    <div className="askForm">
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="question-form p16 s-card">
          <div className="question-layout">
            <div className="title-grid">
              <label className="form-label s-label">
                Title
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
                Body
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
                Tag Name
                <p className="tag-desc fw-normal fs-caption">
                  Add up to 5 tags to describe what your question is about
                </p>
              </label>

              <div className="masterStackDiv">
                <div
                  className="stackTags"
                  style={{ display: tags.length > 0 ? "flex" : "none" }}
                >
                  {tags.map((tag, index) => {
                    return (
                      <div className="stackTag">
                        <button
                          onClick={() => removeTag(index)}
                          className="tagCloseBtn"
                        >
                          x
                        </button>
                        #{tag}
                      </div>
                    );
                  })}
                </div>
                <div className="stackInput">
                  <input
                    type="text"
                    className="tag-input"
                    onKeyDown={handleTag}
                    onChange={handleTag}
                    value={currentTagText}
                    id="tagname"
                    placeholder="e.g. (ajax django string)"
                    required
                  />
                </div>
              </div>

              <input
                className="tag-input s-input"
                type="text"
                name="tagname"
                value={tagname}
                onChange={(e) => onChange(e)}
                id="tagname"
                placeholder="e.g. (ajax django string)"
                required
              />
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
            Ask question
          </button>
        </div>
      </form>
    </div>
  );
}

export default AskForm;
