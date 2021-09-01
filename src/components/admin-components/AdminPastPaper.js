import React, { useState, useEffect } from "react";
import { Grid, Paper } from "@material-ui/core";

function AdminPastPaper(props) {
    const pastPaperData = props.pastPaperData;
    const [user] = useState(JSON.parse(localStorage.getItem("user")) || []);

  console.log(props);
  const [pastPaperForm, setPastPaperForm] = useState({
    question: "",
    year: "",
  });

  //   const [site] = useState(JSON.parse(localStorage.getItem("site")) || null);
  //   const [loadPastPaper, setLoadPastPaper] = useState([]);

  const { question, year } = pastPaperForm;

  const pastPaperDataChange = (e) => {
    setPastPaperForm({ ...setPastPaperForm, [e.target.name]: e.target.value });
    console.log("add past paper", pastPaperForm);
  };

  function onSubmit(e) {
      e.preventDefault();
      const chapterID = pastPaperData.chapterId
    const formData = { question, year, chapterID };

    AdminPastPaper(formData, user.token)
      .then((response) => {
        console.log("Add past paper", response);
        if (response.success === true && response.data) {
          // toast.success(response.message, {
          //   position: toast.POSITION.BOTTOM_RIGHT,
          // });
        }
      })
      .catch((err) => {
        console.log("Add past paper error", err.response);
        //  toast.error(response.message, {
        //    position: toast.POSITION.BOTTOM_RIGHT,
        //  });
      });
  }

  return (
    <div className="AddPastPaper">
      <h3>Post Past Paper</h3>
      <form className="form-pastpaper" onSubit={(e) => onSubmit(e)}>
        <Grid container className="">
          <Grid item xs={12}>
            <Paper className="pastPaper">
              <input
                type="text"
                id="add-question"
                placeholder="Add question here...."
                className="form-control"
                value={question}
                onChange={(e) => pastPaperDataChange(e)}
              />
              <input
                type="text"
                id="add-year"
                placeholder="Add year here...."
                className="form-control"
                value={year}
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
    </div>
  );
}

export default AdminPastPaper;
