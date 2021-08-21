import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Paper from "@material-ui/core/Paper";

function AdminQuiz() {
  const [spacing, setSpacing] = React.useState(2);

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };

  return (
    <div className="AddquizPage">
      <div className="quiz-admin-head">
        <h3>Add a quiz </h3>
      </div>
      <form className="form-quiz">
        <Grid container className="" spacing={2}>
          <Grid item xs={12}>
            <Paper className="">
              <span>Q no 1. </span>
              <input
                type="text"
                id="add-question"
                placeholder="Add question here...."
                className="form-control"
              />
              <div className="option-inputs">
                <input
                  type="text"
                  id="add-question"
                  placeholder="First option here...."
                  className="form-control"
                />
                <input
                  type="text"
                  id="add-question"
                  placeholder="Second option here...."
                  className="form-control"
                />
                <input
                  type="text"
                  id="add-question"
                  placeholder="Third option here...."
                  className="form-control"
                />
                <input
                  type="text"
                  id="add-question"
                  placeholder="Fourth option here...."
                  className="form-control"
                />
              </div>
              <RadioGroup
                name="spacing"
                aria-label="spacing"
                value={spacing.toString()}
                onChange={handleChange}
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
