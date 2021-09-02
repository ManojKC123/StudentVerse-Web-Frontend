import React, { useState, useEffect } from "react";
import { getTopicD } from "../data/api";
import { toast } from "react-toastify";
import { Grid, Paper } from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import { Simulate } from "react-dom/test-utils";

toast.configure();

function StudyContentPanel() {
  const [user] = useState(JSON.parse(localStorage.getItem("user")) || []);
  const [topicData, setTopicData] = useState([]);
  const [sub] = useState(JSON.parse(localStorage.getItem("sub")) || null);
  const [site] = useState(JSON.parse(localStorage.getItem("site")) || []);

  useEffect(() => {
    if (sub.subId) {
      getTopicD(sub.subId, user.token).then((response) => {
        if (response.success === true) {
          setTopicData(response.data);
          console.log("topics data", response.data);
        }
      });
    }
  }, []);

  return (
    <div className="past-paper">
      <Grid container>
        <Grid item md={12}>
          <div className="show-pastpaper-data">
            <div className="inner">
              <Paper className="pastPaper">
                {topicData &&
                  topicData.map((data, index) => {
                    return (
                      <div className="pastpaper-paper" key={index}>
                        {data.chapter ? (
                          data.chapter.map((chpt, index) => {
                            return (
                              <>
                                {/* {chpt.name}
                                {site.chapterName} */}
                                {chpt.name === site.chapterName ? (
                                  <>
                                    <img
                                      className="ds"
                                      src={`https://student-verse.herokuapp.com/chapter/${chpt.pictureName}`}
                                      alt="chapter content"
                                    />
                                    <p>{chpt.content}</p>
                                  </>
                                ) : (
                                  ""
                                )}
                              </>
                            );
                          })
                        ) : (
                          <>
                            <h3>
                              Past Papers for this chapter are being added wait
                              a while{" "}
                            </h3>
                          </>
                        )}
                      </div>
                    );
                  })}
              </Paper>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default StudyContentPanel;
