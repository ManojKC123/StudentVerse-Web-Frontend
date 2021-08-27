import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { KeyboardArrowDown } from "@material-ui/icons/";
import { getTopicD, URL_CONFIG } from "../data/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import QuizPanel from "../components/QuizPanel";
import StudyContentPanel from "../components/StudyContentPanel";

import PastPapersPanel from "../components/PastPapersPanel";

import { makeStyles } from "@material-ui/core/styles";
import StudyMaterials from "./StudyMaterials";

toast.configure();

const StudyChapters = (props) => {
  const [subjectArg, setSubjectArg] = useState({}); // name, id
  const location = useLocation();
  const [topics, setTopics] = useState([]);
  const [studytopic, setStudyTopic] = useState();
  const [user] = useState(JSON.parse(localStorage.getItem("user")) || []);
  const [value, setValue] = useState(0);

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

  console.log("subjectarg", topics);
  const toggleItem = (id) => {
    if (id === studytopic) {
      setStudyTopic();
    } else {
      setStudyTopic(id);
    }
  };

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

  function breadCrumbClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }

  const subTopicClick = (a, b, c, d) => {
    console.log("clicked", a, b, c);
    var url = URL_CONFIG.siteUrl + `/study-materials/${a}/${b}/${c}`;
    window.location.href = url;
    var site = {
      chapter: c,
      chapterName: d,
    };
    localStorage.setItem("site", JSON.stringify(site));
  };
  return (
    <div className="study-chapter">
      <Grid container>
        <Grid item md={12} className="">
          <div className="subject-name">
            <h1>{subjectArg.name}</h1>
          </div>
        </Grid>
        <Grid item md={10} className="">
          <div className="contents">
            <div className="inner-contents bread-crumb-wrap">
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
                <StudyContentPanel />
                StudyMaterialsPanel
              </TabPanel>
              <TabPanel value={value} index={1}>
                <QuizPanel />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <PastPapersPanel />
                Past Papers panel
              </TabPanel>
            </div>
          </div>
        </Grid>
        <Grid item md={2} className="">
          <div className="chapter-list">
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
                              // <Link to="/admin/topic/subtopic">
                              //   <div className="subtopic-name" key={index}>
                              //     {subtopic.name}
                              //   </div>
                              // </Link>
                              <button
                                onClick={() => {
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
                      </div>
                    </>
                  );
                })}
            </ul>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
export default StudyChapters;
