import React, { useState, useEffect, useRef } from "react";
import { getPastPaper } from "../data/api";
import { Grid, Paper } from "@material-ui/core";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function PastPaperPanel() {
  const [user] = useState(JSON.parse(localStorage.getItem("user")) || []);
  const [paperData, setPaperData] = useState([]);
  const [site] = useState(JSON.parse(localStorage.getItem("site")) || []);

  useEffect(() => {}, []);

  return (
    <div className="past-paper">
      <label className="form-label s-label">
        <b>Realnumber</b>
      </label>
      <Grid container>
        <Grid item md={12}>
          <div className="past-paper-inner">
            <Paper className="pastPaper">
              <div className="question-list">
                <div className="question">question</div>
                <div className="year">year</div>
              </div>
            </Paper>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default PastPaperPanel;
