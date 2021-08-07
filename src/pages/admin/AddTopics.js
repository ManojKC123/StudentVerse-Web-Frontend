import React, { useState } from "react";
import { Link } from "react-router-dom";
import { KeyboardArrowDown } from "@material-ui/icons/";

const AddTopics = () => {
  const [currentTopic, setCurrentTopic] = useState("");
  const [currentSubTopic, setCurrentSubTopic] = useState("");
  const [topic, setTopic] = useState(["Physics", "Chemistry"]);
  const [subtopic, setSubTopic] = useState(["Measurement", "Kinematics"]);
  const [studytopic, setStudyTopic] = useState(false);

  // const [studysubtopic, setStudySubTopic] = useState(false);

  const createTopic = (e) => {
    e.preventDefault();
    setTopic([...topic, currentTopic]);
    setCurrentTopic("");
  };

  const createSubTopic = (e) => {
    e.preventDefault();
    setSubTopic([...subtopic, currentSubTopic]);
    setCurrentSubTopic("");
  };

  const toggleGroup = (e) => {
    setStudyTopic(!studytopic);
    console.log(studytopic);
  };

  return (
    <div className="page-content topic-section">
      <div className="container-fluid">
        <div className="topic-listwrap">
          <h3 className="topic-title">Topics:</h3>
          <ul className="topic-lists" id="study-topic">
            {topic &&
              topic.map((sub, index) => {
                return (
                  <>
                    <div
                      className="topic-name"
                      key={index}
                      onClick={() => toggleGroup("study-material")}
                    >
                      {sub}topics
                      <KeyboardArrowDown
                        className={
                          studytopic ? "drop-icon toggle" : "drop-icon"
                        }
                      />
                    </div>
                    <div
                      className={
                        !studytopic ? "subtopic-lists toggle" : "subtopic-lists"
                      }
                      id="subtopic"
                    >
                      {subtopic &&
                        subtopic.map((sub, index) => {
                          return (
                            <Link to="/admin/topic/subtopic">
                              <div className="subtopic-name" key={index}>
                                {sub}sub
                              </div>
                            </Link>
                          );
                        })}
                      <div className="">
                        <input
                          type="text"
                          className="form-control"
                          id="subTopicInput"
                          value={currentSubTopic}
                          onChange={(event) => {
                            setCurrentSubTopic(event.target.value);
                            console.log(
                              "onchange currentsubtopic",
                              currentSubTopic
                            );
                          }}
                          placeholder="New Sub-Topic"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            createSubTopic(e);
                          }}
                          className="btn btn-primary"
                        >
                          Create Sub-Topic
                        </button>
                      </div>
                    </div>
                  </>
                );
              })}
            <div className="">
              <input
                type="text"
                className="form-control input-topic"
                id="topicInput"
                value={currentTopic}
                onChange={(event) => {
                  setCurrentTopic(event.target.value);
                  console.log("onchange currenttopic", currentTopic);
                }}
                placeholder="New Topic"
              />
              <button
                type="button"
                onClick={(e) => {
                  createTopic(e);
                }}
                className="btn btn-primary"
              >
                Create Topic
              </button>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default AddTopics;
