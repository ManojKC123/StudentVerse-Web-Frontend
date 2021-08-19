import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { KeyboardArrowDown } from "@material-ui/icons/";
import { createTopicD, getTopicD, createSubTopicD } from "../../data/api";

const AddTopics = (props) => {
  const location = useLocation();
  const [currentTopic, setCurrentTopic] = useState("");
  const [currentSubTopic, setCurrentSubTopic] = useState("");
  const [currentSubTopicContent, setCurrentSubTopicContent] = useState("");
  const [subTopicPicture, setCurSubTopicFile] = useState(null);
  const [subjectArg, setSubjectArg] = useState({}); // name, id
  const [topics, setTopics] = useState([]);

  const [studytopic, setStudyTopic] = useState();
  const [user] = useState(JSON.parse(localStorage.getItem("user")) || []);

  useEffect(() => {
    setSubjectArg({
      name: props.match.params.subname,
      id: location.propsParam?.id,
    });

    location.propsParam?.id &&
      getTopicD(location.propsParam?.id, user.token).then((response) => {
        if (response.success === true) {
          setTopics(response.data);
        }
      });
  }, [props]);

  const createTopic = (e) => {
    function titleCase(str) {
      return str.toLowerCase().replace(/\b(\w)/g, (s) => s.toUpperCase());
    }
    const name = titleCase(currentTopic);
    const subject = location.propsParam?.id;
    const topicData = { name, subject };
    createTopicD(topicData, user.token).then((response) => {
      if (response.success === true && response.data) {
        setTopics(response.data.topic);
        setCurrentTopic("");
      }
    });
  };

  const createSubTopic = (topicID) => {
    function titleCase(str) {
      return str.toLowerCase().replace(/\b(\w)/g, (s) => s.toUpperCase());
    }
    const subject = location.propsParam?.id;
    const name = titleCase(currentSubTopic);
    const topic = topicID;
    const content = currentSubTopicContent;
    const picture = subTopicPicture;

    const subTopicArg = new FormData();
    subTopicArg.append("subject", subject);
    subTopicArg.append("topic", topic);
    subTopicArg.append("name", name);
    subTopicArg.append("content", content);
    subTopicArg.append("picture", picture);

    createSubTopicD(subTopicArg, user.token).then((response) => {
      if (response.success === true && response.data) {
        console.log("sub topic created", response.data.topic);
        setTopics(response.data.topic);
        setCurrentSubTopic("");
        setCurrentSubTopicContent("");
        setCurSubTopicFile(null);
      }
    });
  };

  const toggleItem = (id) => {
    if (id === studytopic) {
      setStudyTopic();
    } else {
      setStudyTopic(id);
    }
  };

  return (
    <div className="topic-section">
      <div className="container-fluid">
        <div className="topic-listwrap">
          <h3 className="topic-title">{subjectArg.name}</h3>
          <ul className="topic-lists" id="study-topic">
            {topics &&
              topics.map((topic, index) => {
                return (
                  <>
                    <div
                      className="topic-name"
                      key={index}
                      onClick={() => toggleItem(topic._id)}
                    >
                      {topic.name}
                      <KeyboardArrowDown
                        className={
                          studytopic === topic._id
                            ? "drop-icon toggle"
                            : "drop-icon"
                        }
                      />
                    </div>

                    <div
                      className={
                        studytopic === topic._id
                          ? "subtopic-lists"
                          : "subtopic-lists toggle"
                      }
                      id={topic._id}
                    >
                      {topic.chapter &&
                        topic.chapter.map((subtopic, index) => {
                          return (
                            <Link to="/admin/topic/subtopic">
                              <div className="subtopic-name" key={index}>
                                {subtopic.name}
                              </div>
                            </Link>
                          );
                        })}
                      <div className="">
                        <input
                          type="text"
                          className="form-control"
                          value={currentSubTopic}
                          onChange={(event) => {
                            setCurrentSubTopic(event.target.value);
                          }}
                          placeholder="New Sub-Topic"
                        />
                        <input
                          type="text"
                          className="form-control"
                          value={currentSubTopicContent}
                          onChange={(event) => {
                            setCurrentSubTopicContent(event.target.value);
                          }}
                          placeholder="New Sub-Topic Content"
                        />
                        <input
                          type="file"
                          className="form-control"
                          id="subjecFileInput"
                          defaultValue={subTopicPicture}
                          onChange={(e) => {
                            setCurSubTopicFile(e.target.files[0]);
                          }}
                        />

                        <button
                          type="button"
                          onClick={() => {
                            createSubTopic(topic._id);
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
                id="input-topic"
                value={currentTopic}
                onChange={(event) => {
                  setCurrentTopic(event.target.value);
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
