import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { KeyboardArrowDown } from "@material-ui/icons/";
import { getSubject } from "../../data/api";

const AddTopics = () => {
  const [currentTopic, setCurrentTopic] = useState("");
  const [currentSubTopic, setCurrentSubTopic] = useState("");
  const [topic, setTopic] = useState(["Physics", "Chemistry"]);
  const [subtopic, setSubTopic] = useState(["Measurement", "Kinematics"]);
  const [studytopic, setStudyTopic] = useState(false);
  const [subject, setSubject] = useState([]);
  const [user] = useState(JSON.parse(localStorage.getItem("user")) || []);

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

  useEffect(() => {
    getSubject(user.token).then((response) => {
      if (response.success === true) {
        setSubject(response.data);
        console.log("sublists topics addtopics", response.data);
      }
    });
  }, []);

  return (
    <div className="page-content topic-section">
      <div className="container-fluid">
        <div className="topic-listwrap">
          <h3 className="topic-title">Topics:</h3>
          <ul className="topic-lists" id="study-topic">
            {subject &&
              subject.map((sub, index) => {
                return (
                  <>
                    <div
                      className="topic-name"
                      key={index}
                      onClick={() => toggleGroup("study-material")}
                    >
                      {sub.name}
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
                      {sub.topic &&
                        sub.topic.map((topic, index) => {
                          return (
                            <Link to="/admin/topic/subtopic">
                              <div className="subtopic-name" key={index}>
                                {topic.name}
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
