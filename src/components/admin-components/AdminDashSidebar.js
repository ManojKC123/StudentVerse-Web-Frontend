import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createSubjectD, getSubject } from "../../data/api";
import {
  Dashboard,
  MenuBook,
  Category,
  KeyboardArrowDown,
} from "@material-ui/icons/";

const AdminDashSidebar = () => {
  const [subName, setCurrentSub] = useState("");
  const [description, setCurSubDesc] = useState("");
  const [picture, setCurSubFile] = useState(null);
  const [subject, setSubject] = useState([]);
  const [studymaterial, setStudyMaterial] = useState(false);
  const [user] = useState(JSON.parse(localStorage.getItem("user")) || []);

  const toggleGroup = (e) => {
    setStudyMaterial(!studymaterial);
  };
  const createSubject = () => {
    function titleCase(str) {
      return str.toLowerCase().replace(/\b(\w)/g, (s) => s.toUpperCase());
    }
    const name = titleCase(subName);
    const subjectArg = new FormData();
    subjectArg.append("name", name);
    subjectArg.append("description", description);
    subjectArg.append("picture", picture);

    createSubjectD(subjectArg, user.token).then((response) => {
      if (response.success === true && response.data) {
        setSubject([...subject, response.data]);
        setCurrentSub("");
        setCurSubDesc("");
        setCurSubFile(null);
      }
    });
  };

  useEffect(() => {
    getSubject(user.token).then((response) => {
      if (response.success === true) {
        setSubject(response.data);
      }
    });
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar-inner">
        <ul className="sidebar-list">
          <Link to="/admin">
            <li>
              <Dashboard className="sidebar-icons" />
              Dashboard
            </li>
          </Link>
          <li onClick={() => toggleGroup("study-material")}>
            <MenuBook className="sidebar-icons" />
            Study Materials
            <KeyboardArrowDown
              className={studymaterial ? "drop-icon toggle" : "drop-icon"}
            />
          </li>
          <ul
            className={
              !studymaterial ? "subject-lists toggle" : "subject-lists"
            }
            id="study-material"
          >
            {subject &&
              subject.map((sub, index) => {
                return (
                  <Link to="/admin/topic">
                    <div className="subject-name" key={index}>
                      {sub.name}
                    </div>
                  </Link>
                );
              })}

            <div className="create-list-button">
              <input
                type="text"
                className="form-control"
                id="subjectInput"
                value={subName}
                onChange={(event) => {
                  setCurrentSub(event.target.value);
                }}
                placeholder="New Subject"
              />
              <input
                type="text"
                className="form-control"
                id="subjectDescriptionInput"
                value={description}
                onChange={(event) => {
                  setCurSubDesc(event.target.value);
                }}
                placeholder="New Subject"
              />
              <input
                type="file"
                className="form-control"
                id="subjecFileInput"
                defaultValue={picture}
                onChange={(e) => {
                  setCurSubFile(e.target.files[0]);
                }}
              />
              <button
                type="button"
                onClick={(e) => {
                  createSubject(e);
                }}
                className="btn btn-primary"
              >
                Create subject
              </button>
            </div>
          </ul>

          <Link to="/admin/quiz">
            <li>
              <Category className="sidebar-icons" />
              Quiz
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashSidebar;
