import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
  }));
  

function AddQuiz() {

    const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };
 

  return (
      <div className="AddquizPage"> 
      <h3>Start the quiz</h3>
        <form className = "form-quiz">
                <div class="row g-3 align-items-center">
                    <div class="col-auto quiz-question">
                        <label for="inputPassword6" class="col-form-label">question</label>
                    </div>
                </div>
                <Grid container className={classes.root} spacing={2}>
                    <Grid item xs={12}>
                        <Paper className={classes.control}>

                            <RadioGroup
                                name="spacing"
                                aria-label="spacing"
                                value={spacing.toString()}
                                onChange={handleChange}
                                row
                                className= "quiz-radiowrap"
                            >
                                {[1,2,3,4].map((value) => (
                                <FormControlLabel
                                    key={value}
                                    value={value.toString()}
                                    control={<Radio />}
                                    label={value.toString()}
                                />
                                ))}
                            </RadioGroup>
                        </Paper>
                    </Grid>
                </Grid>
                <button type="submit" class="btn btn-primary btnquiz">Submit</button>
        </form>
      </div>
  );
}

export default AddQuiz;
