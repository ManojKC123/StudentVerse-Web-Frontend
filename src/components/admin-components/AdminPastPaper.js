import React, { useState, useEffect } from "react";
import { Grid, Paper } from "@material-ui/core";
import { postPastPaper, loadPastPaper } from "../../data/api";
import { toast } from "react-toastify";

toast.configure();

function AdminPastPaper(props) {
  const [user] = useState(JSON.parse(localStorage.getItem("user")) || []);
  const [pastPaperForm, setPastPaperForm] = useState({
    question1: "",
    question2: "",
    question3: "",
    question4: "",
    question5: "",
    question6: "",
    question7: "",
    question8: "",
    question9: "",
    question10: "",
    year: "",
  });
  const [site] = useState(JSON.parse(localStorage.getItem("site")) || null);
  const [loadPastPapers, setLoadPastPaper] = useState([]);

  useEffect(() => {
    console.log("useeffe", site.subTopicID);
    loadPastPaper(site.subTopicID, user.token)
      .then((response) => {
        console.log("Past paper loading successfull", response);
        if (response.success === true && response.data) {
          setLoadPastPaper(response.data);
        }
      })
      .catch((err) => {
        console.log("Loading past paper error", err.response);
      });
  }, []);

  console.log(loadPastPapers);

  const {
    question1,
    question2,
    question3,
    question4,
    question5,
    question6,
    question7,
    question8,
    question9,
    question10,
    year,
  } = pastPaperForm;

  const pastPaperDataChange = (e) => {
    setPastPaperForm({ ...pastPaperForm, [e.target.name]: e.target.value });
    console.log("add past paper", pastPaperForm);
  };

  function onSubmit(e) {
    e.preventDefault();
    const chapterid = site.subTopicID;
    const question = [
      question1,
      question2,
      question3,
      question4,
      question5,
      question6,
      question7,
      question8,
      question9,
      question10,
    ];
    let formData = { question, year, chapterid };

    postPastPaper(formData, user.token)
      .then((response) => {
        console.log("Add past paper", response);
        if (response.success === true && response.data) {
          toast.success("Add Past Paper Successfull", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      })
      .catch((err) => {
        console.log("Add past paper error", err.response);
        toast.error("Add Past Paper Error", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  }

  return (
    <div className="AddPastPaper">
      <h3>Post Past Paper</h3>
      <form className="form-pastpaper" onSubmit={(e) => onSubmit(e)}>
        <Grid container className="">
          <Grid item xs={12}>
            <Paper className="pastPaper">
              <input
                type="text"
                id="add-question"
                placeholder="Add question here...."
                className="form-control"
                value={question1}
                name="question1"
                onChange={(e) => pastPaperDataChange(e)}
              />
              <input
                type="text"
                id="add-question"
                placeholder="Add question here...."
                className="form-control"
                value={question2}
                name="question2"
                onChange={(e) => pastPaperDataChange(e)}
              />
              <input
                type="text"
                id="add-question"
                placeholder="Add question here...."
                className="form-control"
                value={question3}
                name="question3"
                onChange={(e) => pastPaperDataChange(e)}
              />
              <input
                type="text"
                id="add-question"
                placeholder="Add question here...."
                className="form-control"
                value={question4}
                name="question4"
                onChange={(e) => pastPaperDataChange(e)}
              />
              <input
                type="text"
                id="add-question"
                placeholder="Add question here...."
                className="form-control"
                value={question5}
                name="question5"
                onChange={(e) => pastPaperDataChange(e)}
              />
              <input
                type="text"
                id="add-question"
                placeholder="Add question here...."
                className="form-control"
                value={question6}
                name="question6"
                onChange={(e) => pastPaperDataChange(e)}
              />
              <input
                type="text"
                id="add-question"
                placeholder="Add question here...."
                className="form-control"
                value={question7}
                name="question7"
                onChange={(e) => pastPaperDataChange(e)}
              />
              <input
                type="text"
                id="add-question"
                placeholder="Add question here...."
                className="form-control"
                value={question8}
                name="question8"
                onChange={(e) => pastPaperDataChange(e)}
              />
              <input
                type="text"
                id="add-question"
                placeholder="Add question here...."
                className="form-control"
                value={question9}
                name="question9"
                onChange={(e) => pastPaperDataChange(e)}
              />
              <input
                type="text"
                id="add-question"
                placeholder="Add question here...."
                className="form-control"
                value={question10}
                name="question10"
                onChange={(e) => pastPaperDataChange(e)}
              />
              <input
                type="text"
                id="add-year"
                placeholder="Add year here...."
                className="form-control"
                value={year}
                name="year"
                onChange={(e) => pastPaperDataChange(e)}
              />
            </Paper>
          </Grid>
        </Grid>
        <button
          type="submit"
          id="pastpaper-admin"
          class="btn btn-primary btnpastpaper"
        >
          Add Question
        </button>
      </form>
      <div className="show-pastpaper-data">
        <div className="inner">
          <Paper className="pastPaper">
            {loadPastPapers &&
              loadPastPapers.map((data, index) => {
                return (
                  <div className="pastpaper-paper" key={index}>
                    <h4> {data.year}</h4>
                    <p>
                      {data.question &&
                        data.question.map((qst, i) => {
                          return (
                            <p>
                              Question {i + 1}: {qst}
                            </p>
                          );
                        })}
                    </p>
                    <hr />
                  </div>
                );
              })}
          </Paper>
        </div>
      </div>
    </div>
  );
}

export default AdminPastPaper;
