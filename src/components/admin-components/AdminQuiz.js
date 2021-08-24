import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Paper from "@material-ui/core/Paper";
import { createQuiz } from "../../data/api";

function AdminQuiz(props) {
  const [site] = useState(JSON.parse(localStorage.getItem("site")) || []);
  const [quizForm, setQuizForm] = useState({
    question: "",
    // options: [{ option1: "", option2: "", option3: "", option4: "" }],
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: Number,
    name: site.subTopicName,
  });

  const { question, option1, option2, option3, option4, answer, name } =
    quizForm;

  const formDataChange = (e) => {
    setQuizForm({ ...quizForm, [e.target.name]: e.target.value });
  };

  function onSubmit(e) {
    e.preventDefault();
    const options = [option1, option2, option3, option4];
    const formData = { question, options, answer, name };

    createQuiz(formData, site.subTopicID)
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
    <div className="AddquizPage">
      <div className="quiz-admin-head">
        <h3>Add a quiz </h3>
      </div>
      <form className="form-quiz" onSubmit={(e) => onSubmit(e)}>
        <Grid container className="" spacing={2}>
          <Grid item xs={12}>
            <Paper className="">
              <span>Q no 1. </span>
              <input
                type="text"
                id="add-question"
                placeholder="Add question here...."
                className="form-control"
                name="question"
                value={question}
                onChange={(e) => formDataChange(e)}
              />
              <div className="option-inputs">
                <input
                  type="text"
                  id="add-question"
                  placeholder="First option here...."
                  className="form-control"
                  name="option1"
                  value={option1}
                  onChange={(e) => formDataChange(e)}
                />
                <input
                  type="text"
                  id="add-question"
                  placeholder="Second option here...."
                  className="form-control"
                  name="option2"
                  value={option2}
                  onChange={(e) => formDataChange(e)}
                />
                <input
                  type="text"
                  id="add-question"
                  placeholder="Third option here...."
                  className="form-control"
                  name="option3"
                  value={option3}
                  onChange={(e) => formDataChange(e)}
                />
                <input
                  type="text"
                  id="add-question"
                  placeholder="Fourth option here...."
                  className="form-control"
                  name="option4"
                  value={option4}
                  onChange={(e) => formDataChange(e)}
                />
              </div>
              <RadioGroup
                name="answer"
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
          </Grid>
        </Grid>
        <button type="submit" class="btn btn-primary btnquiz">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AdminQuiz;
