import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { KeyboardArrowDown } from "@material-ui/icons/";
import {
  createTopicD,
  getTopicD,
  createSubTopicD,
  URL_CONFIG,
} from "../../data/api";
import Grid from "@material-ui/core/Grid";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import AdminQuiz from "../../components/admin-components/AdminQuiz";
// import StudyContentPanel from "../components/StudyContentPanel";
import AdminPastPaper from "../../components/admin-components/AdminPastPaper";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";

const AdminCreate = (props) => {
  const location = useLocation();
  const [currentTopic, setCurrentTopic] = useState("");
  const [currentSubTopic, setCurrentSubTopic] = useState("");
  const [currentSubTopicContent, setCurrentSubTopicContent] = useState("");
  const [subTopicPicture, setCurSubTopicFile] = useState(null);
  const [subjectArg, setSubjectArg] = useState({}); // name, id
  const [topics, setTopics] = useState([]);
  const [studytopic, setStudyTopic] = useState();
  const [user] = useState(JSON.parse(localStorage.getItem("user")) || []);
  const [subId] = useState(JSON.parse(localStorage.getItem("subId")) || null);

  const [value, setValue] = useState(0);

  useEffect(() => {
    setSubjectArg({
      name: props.match.params.subname,
      id: location.propsParam?.id,
    });

    if (subId) {
      console.log("id loc", subId);
      getTopicD(subId, user.token).then((response) => {
        if (response.success === true) {
          setTopics(response.data);
        }
      });
    }
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

  function breadCrumbClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      "aria-controls": `scrollable-auto-tabpanel-${index}`,
    };
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleItem = (id) => {
    if (id === studytopic) {
      setStudyTopic();
    } else {
      setStudyTopic(id);
    }
  };

  const subTopicClick = (a, b, c, d) => {
    console.log("clicked", a, b, c);
    var url = URL_CONFIG.adminUrl + `/${a}/${b}/${c}`;
    window.location.href = url;
    var site = {
      subject: a,
      topic: b,
      subTopicID: c,
      subTopicName: d,
    };

    localStorage.setItem("site", JSON.stringify(site));
  };

  return (
    <div className="editor-page">
      <div className="editor-page-inner">
        <div className="editor-section">
          <div className="editor-section-inner">
            <Grid container>
              <Grid item md={12} className="">
                <div className="subject-name">
                  <h1>{subjectArg.name}</h1>
                </div>
              </Grid>
              <Grid item md={12} className="">
                <div className="contents ">
                  <div className="inner-contents editor-tabs bread-crumb-wrap">
                    <Breadcrumbs
                      separator={<NavigateNextIcon fontSize="small" />}
                      aria-label="breadcrumb"
                    >
                      <Link color="inherit" href="/" onClick={breadCrumbClick}>
                        Math
                      </Link>
                      <Link
                        color="inherit"
                        href="/getting-started/installation/"
                        onClick={breadCrumbClick}
                      >
                        Algebra
                      </Link>
                      <Typography color="textPrimary">RealNumber</Typography>
                    </Breadcrumbs>
                    <AppBar position="static" color="default">
                      <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                      >
                        <Tab label="Study Materials" {...a11yProps(0)} />
                        <Tab label="Quiz" {...a11yProps(1)} />
                        <Tab label="Past Papers" {...a11yProps(2)} />
                      </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                      {/* <StudyContentPanel /> */}
                      StudyMaterialsPanel
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                      <AdminQuiz />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                      <AdminPastPaper />
                    </TabPanel>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
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
                            // <Link
                            //   to={{
                            //     pathname: `/admin/${subjectArg.name}/${topic.name}/${subtopic.name}`,
                            //     propsParam: { id: subtopic._id },
                            //   }}
                            // >
                            //   <div className="subtopic-name" key={index}>
                            //     {subtopic.name}
                            //   </div>
                            // </Link>
                            <button
                              onClick={async () => {
                                subTopicClick(
                                  subjectArg.name,
                                  topic.name,
                                  subtopic._id,
                                  subtopic.name
                                );
                              }}
                            >
                              {subtopic.name}
                            </button>
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
                        <label for="subjecFileInput">
                          Pictures with extension jpg, png, svg
                        </label>

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
                id="create-button"
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

export default AdminCreate;
