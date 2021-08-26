import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Paper from "@material-ui/core/Paper";
import { createQuiz, loadQuiz } from "../../data/api";
import { render } from "@testing-library/react";

function AdminQuiz(props) {
  const quizData = props.quizData;
  console.log(props);
  const [quizForm, setQuizForm] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: Number,
  });
  const [site] = useState(JSON.parse(localStorage.getItem("site")) || null);
  const [loadQuizData, setLoadQuizData] = useState([]);

  const { question, option1, option2, option3, option4, answer, name } =
    quizForm;

  useEffect(() => {
    loadQuiz(site.subTopicID)
      .then((response) => {
        console.log("chpater load", response);
        if (response.success === true && response.data) {
          setLoadQuizData(response.data);
        }
      })
      .catch((err) => {
        console.log("Add quiz error", err.response);
      });
  }, []);

  const formDataChange = (e) => {
    setQuizForm({ ...quizForm, [e.target.name]: e.target.value });
  };

  function onSubmit(e) {
    e.preventDefault();
    const options = [option1, option2, option3, option4];
    const formData = { question, options, answer, name };

    createQuiz(formData, quizData.chapterId)
      .then((response) => {
        console.log("Add quiz resp", response);
        if (response.success === true && response.data) {
          // toast.success(response.message, {
          //   position: toast.POSITION.BOTTOM_RIGHT,
          // });
        }
      })
      .catch((err) => {
        console.log("Add quiz error", err.response);
        //  toast.error(response.message, {
        //    position: toast.POSITION.BOTTOM_RIGHT,
        //  });
      });
  }

  return (
    <>
      <div className="AddquizPage">
        <div className="quiz-admin-head">
          <h3>Add a quiz </h3>
        </div>
        <form className="form-quiz" onSubmit={(e) => onSubmit(e)}>
          <Paper className="form-paper">
            <span>Q no 1. </span>
            <input
              type="text"
              id="question"
              placeholder="Add question here...."
              className="form-control"
              name="question"
              value={question}
              onChange={(e) => formDataChange(e)}
            />
            <div className="option-inputs">
              <input
                type="text"
                id="option1"
                placeholder="First option here...."
                className="form-control"
                name="option1"
                value={option1}
                onChange={(e) => formDataChange(e)}
              />
              <input
                type="text"
                id="option2"
                placeholder="Second option here...."
                className="form-control"
                name="option2"
                value={option2}
                onChange={(e) => formDataChange(e)}
              />
              <input
                type="text"
                id="option3"
                placeholder="Third option here...."
                className="form-control"
                name="option3"
                value={option3}
                onChange={(e) => formDataChange(e)}
              />
              <input
                type="text"
                id="option4"
                placeholder="Fourth option here...."
                className="form-control"
                name="option4"
                value={option4}
                onChange={(e) => formDataChange(e)}
              />
            </div>
            <RadioGroup
              name="answer"
              id="answer"
              aria-label="answer"
              value={answer.toString()}
              onChange={formDataChange}
              row
              className="quiz-radiowrap"
            >
              {[1, 2, 3, 4].map((value) => (
                <FormControlLabel
                  key={value}
                  value={value.toString()}
                  control={<Radio />}
                  label={value.toString()}
                />
              ))}
              <span> Select Right option.</span>
            </RadioGroup>
          </Paper>
          <button type="submit" class="btn btn-primary btnquiz">
            Submit
          </button>
        </form>

        <div className="show-quiz-data">
          <div className="inner">
            {loadQuizData &&
              loadQuizData.map((data, index) => {
                return (
                  <div className="quizdata-paper">
                    Question no {index + 1}
                    <h4> {data.question}</h4>
                    <p> Option 1: {data.options[0]}</p>
                    {/* {({data.options[0]}==={data.answer})?("answer"):("")} */}
                    <p> Option 2: {data.options[1]}</p>
                    <p> Option 3: {data.options[2]}</p>
                    <p> Option 4: {data.options[3]}</p>
                    <b>Answer: {data.answer}</b>
                    <hr />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminQuiz;
