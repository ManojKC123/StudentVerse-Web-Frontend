import React, { useState, useEffect, useRef } from "react";
import {} from "../data/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Grid } from "@material-ui/core";
import { loadQuiz, sendScore } from "../data/api";

toast.configure();

function QuizPanel(props) {
  const [user] = useState(JSON.parse(localStorage.getItem("user")) || []);
  const [site] = useState(JSON.parse(localStorage.getItem("site")) || []);
  const [quizDetails, setQuizDetails] = useState([]);
  let [currentQuiz, setCurrentQuiz] = useState(0);
  const [quizScore, setQuizscore] = useState(0);
  const [quizFTime, setQuizFTime] = useState(0);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [startTimer, setStartTimer] = useState(false);
  let myInterval;

  useEffect(() => {
    if (startTimer) {
      myInterval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(myInterval);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);

      return () => {
        clearInterval(myInterval);
      };
    }
  }, [startTimer, seconds]);

  const startQuiz = (e) => {
    loadQuiz(site.chapter)
      .then((response) => {
        if (response.success === true && response.data) {
          const random = response.data.sort(() => 0.5 - Math.random());
          let selected = random.slice(0, 10);
          console.log("here is quiz", selected);
          setQuizDetails(selected);
          setStartTimer(true);
        }
      })
      .catch((err) => {
        console.log("Add answer error", err.response);
      });
    console.log("curr quiz", currentQuiz);
  };

  const handleQuiz = ({ option, answer, type }) => {
    if (type === "Next") {
      setCurrentQuiz(currentQuiz + 1);
    }
    if (type === "Previous") {
      setCurrentQuiz(currentQuiz - 1);
    }
    if (type === "Submit") {
      console.log("option", option);
      console.log("answer", answer);
      if (option === answer) {
        console.log("right answer", option, answer);
        setQuizscore(quizScore + 1);
      }
      setCurrentQuiz(currentQuiz + 1);
      console.log("qdetail", quizDetails);
    }
    if (type === "Finish") {
      clearInterval(myInterval);
      let finishedTime = { minutes, seconds };
      let timeTaken = 300 - (finishedTime.minutes * 60 + seconds);
      let mm = parseInt(timeTaken / 60);
      let ss = timeTaken % 60;
      let timeTms = mm + ":" + ss;
      let ext = mm === 0 ? "secs" : " mins";
      let quizName = site.chapterName;
      let scoreMsg =
        "Acheived " +
        quizScore +
        " out of 10 in " +
        site.chapterName +
        "'s quiz in " +
        mm +
        ":" +
        ss +
        ext;
      let scoreData = { quizScore, timeTms, quizName };
      // console.log("score", scoreData);
      sendScore(scoreData, user.token)
        .then((response) => {
          if (response.success === true && response.data) {
            toast.success(scoreMsg, {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          }
        })
        .catch((err) => {
          console.log("Quiz score error", err.response);
        });
    }
  };

  return (
    <div className="quiz">
      <Grid container>
        <Grid item md={9}>
          <div className="quiz-start">
            <button
              onClick={startQuiz}
              class="btn btn-primary mb-3 btnsubmit-quiz"
            >
              Start quiz
            </button>

            {minutes === 0 && seconds === 0 ? null : (
              <h1>
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </h1>
            )}
          </div>
          <form>
            <label className="form-label s-label">
              <b>Lets start the quiz</b>
              <p className="title-desc fw-normal fs-caption">
                Read the question and give your answer properly
              </p>
            </label>

            <div className={`give-quiz`}>
              <label class="form-label quiz-question">
                {quizDetails[currentQuiz]?.question}
              </label>
              <div class="quiz-opt-wrap">
                {quizDetails &&
                  quizDetails[currentQuiz]?.options.map((option, i) => {
                    return (
                      <div className="quiz-option">
                        <input
                          class=""
                          type="button"
                          value={option}
                          onClick={() =>
                            handleQuiz({
                              option: option,
                              answer: quizDetails[currentQuiz].answer,
                              type: "Submit",
                            })
                          }
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          </form>
          <div className="quiz-button-group">
            <button
              class="btn btn-primary btnsubmit-quiz"
              onClick={() => handleQuiz({ type: "Previous" })}
            >
              Previous
            </button>
            {/* <button
              class="btn btn-primary btnsubmit-quiz"
              onClick={() =>
                handleQuiz({ currentquiz: currentQuiz, type: "Submit" })
              }
            >
              Submit
            </button> */}
            <button
              class="btn btn-primary btnnext-quiz"
              onClick={() =>
                handleQuiz({
                  type:
                    quizDetails.length - 1 > currentQuiz ? "Next" : "Finish",
                })
              }
            >
              {quizDetails.length - 1 > currentQuiz ? "Next" : "Finish"}
            </button>
          </div>
        </Grid>
        <Grid item md={3}></Grid>
      </Grid>
    </div>
  );
}

export default QuizPanel;
