import React, { useState, useEffect } from "react";
import { loadPastPaper } from "../data/api";
import { Grid, Paper } from "@material-ui/core";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function PastPaperPanel() {
  const [user] = useState(JSON.parse(localStorage.getItem("user")) || []);
  const [paperData, setPastPaper] = useState([]);
  const [site] = useState(JSON.parse(localStorage.getItem("site")) || []);

  useEffect(() => {
    loadPastPaper(site.chapter, user.token)
      .then((response) => {
        console.log("Past paper Loaded", response);
        if (response.success === true && response.data) {
          setPastPaper(response.data);
        }
        if (response.success === true && response.count === 0) {
          setPastPaper(null);
        }
      })
      .catch((err) => {
        console.log("Loading past paper error", err.response);
      });
  }, []);

  return (
    <div className="past-paper">
      <Grid container>
        <Grid item md={12}>
          <div className="show-pastpaper-data">
            <div className="inner">
              <Paper className="pastPaper">
                {paperData ? (
                  paperData.map((data, index) => {
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
                  })
                ) : (
                  <>
                    <h3>
                      Past Papers for this chapter are being added wait a while{" "}
                    </h3>
                  </>
                )}
              </Paper>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default PastPaperPanel;
