import React, { useState, useEffect, useRef } from "react";
import { addQuestion } from "../data/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Grid } from "@material-ui/core";
import { loadQuiz } from "../data/api";

toast.configure();

function QuizPanel(props) {
  const [user] = useState(JSON.parse(localStorage.getItem("user")) || []);
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    tags: [],
  });
  const [quizDetails, setQuizDetails] = useState([]);
  const [randomQuiz, setRandomQuiz] = useState(Array(10).fill(0)) || [];

  const [site] = useState(JSON.parse(localStorage.getItem("site")) || []);

  //   useEffect(() => {}, []);

  //   const onChange = (e) =>
  //     setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    // e.preventDefault();
  };
  const startQuiz = (e) => {
    loadQuiz(site.chapter)
      .then((response) => {
        if (response.success === true && response.data) {
          setQuizDetails(response.data);
        }
      })
      .catch((err) => {
        console.log("Add answer error", err.response);
      });

    const random = quizDetails.sort(() => 0.5 - Math.random());
    let selected = random.slice(0, 10);
    setRandomQuiz(selected);
  };

  return (
    <div className="quiz">
      <Grid container>
        <Grid item md={9}>
          <button
            onClick={startQuiz}
            class="btn btn-primary mb-3 btnsubmit-quiz"
          >
            Start quiz
          </button>
          <form onSubmit={(e) => onSubmit(e)}>
            <label className="form-label s-label">
              <b>Lets start the quiz</b>
              <p className="title-desc fw-normal fs-caption">
                Read the question and give your answer properly
              </p>
            </label>

            {randomQuiz &&
              randomQuiz.map((ques, index) => {
                return (
                  <div className="give-quiz" key={index}>
                    <label class="form-label quiz-question">
                      {ques.question}
                    </label>
                    <div className="row">
                      <div class="form-check quiz-row1">
                        {ques.options &&
                          ques.options.map((option, i) => {
                            return (
                              <div className="quiz-option">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="flexCheckDefault"
                                />
                                <label
                                  class="form-check-label "
                                  for="flexCheckDefault"
                                  key={i}
                                >
                                  {option}
                                </label>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                    <button
                      type="submit"
                      class="btn btn-primary mb-3 btnsubmit-quiz"
                    >
                      Submit
                    </button>
                  </div>
                );
              })}
          </form>
        </Grid>
        <Grid item md={3}>
          <div className="test">kjklkjhlkjh</div>
        </Grid>
      </Grid>
    </div>
  );
}

export default QuizPanel;
