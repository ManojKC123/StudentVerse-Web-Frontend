import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Dashboard,
  MenuBook,
  Category,
  KeyboardArrowDown,
} from "@material-ui/icons/";

const AdminDashSidebar = () => {
  const [currentSub, setCurrentSub] = useState("");
  const [subject, setSubject] = useState(["Science", "EPH"]);
  const [studymaterial, setStudyMaterial] = useState(false);

  const createSubject = (e) => {
    e.preventDefault();
    setSubject([...subject, currentSub]);
    setCurrentSub("");
  };
  const toggleGroup = (e) => {
    setStudyMaterial(!studymaterial);
    console.log(studymaterial);
  };

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
                  <Link to="/admin">
                    <div className="subject-name" key={index}>
                      {sub}
                    </div>
                  </Link>
                );
              })}
            <div class="">
              <input
                type="text"
                className="form-control"
                id="subjectInput"
                value={currentSub}
                onChange={(event) => {
                  setCurrentSub(event.target.value);
                  console.log("onchange currentsub", currentSub);
                }}
                placeholder="New Subject"
              />
              <button
                type="button"
                onClick={(e) => {
                  createSubject(e);
                }}
                class="btn btn-primary"
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
