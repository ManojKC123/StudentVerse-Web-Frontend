import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const Header = (props) => {
  const [user] = useState(JSON.parse(localStorage.getItem("user")) || []);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutUser = (e) => {
    // axios
    //   .post("https://student-verse.herokuapp.com/logout", user.token)
    //   .then((response) => {
    //     console.log("logout response", response);
    localStorage.clear();
    toast.success("Logout Succesfull !!!", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    setTimeout(function () {
      window.location.href = "/";
    }, 1000);
    //   })
    //   .catch((err) => {
    //     console.log("login error", err);
    //   });
  };

  useEffect(() => {}, [props, user]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
      <a href="/" className="navbar-brand">
        <img src="images/logo.png" className="logo" alt="Logo" />
      </a>
      <button
        type="button"
        className="navbar-toggler"
        data-toggle="collapse"
        data-target="#navbarCollapse"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        id="navbarCollapse"
        className="collapse navbar-collapse justify-content-start"
      >
        <div className="navbar-nav">
          <Link to="/study-materials" className="nav-item nav-link">
            Study Materials
          </Link>
          <Link to="/quiz" className="nav-item nav-link">
            <b>Quiz</b>
          </Link>
        </div>
        <form className="navbar-form form-inline">
          <div className="input-group search-box">
            <input
              type="text"
              id="search"
              className="form-control"
              placeholder="Search here..."
            />
            <div className="input-group-append">
              <span className="input-group-text">
                <SearchIcon className="" />
              </span>
            </div>
          </div>
        </form>
        <div className="navbar-nav ml-auto action-buttons">
          {!user.token ? (
            <>
              <a href="/login" className="nav-link">
                <b>Login</b>
              </a>
              <a href="/signup" className="btn btn-primary">
                <b>Sign up</b>
              </a>
            </>
          ) : (
            <>
              <div className="account-wrap" onClick={handleClick}>
                <IconButton
                  className="account-icon-button"
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <AccountCircleIcon className="account-icon" />
                </IconButton>
                <div className="account-name">
                  <span className="block">{user.username}</span>
                  {user.admin === "token" ? (
                    <span className="admin-wrap">Admin Login</span>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <Menu
                className="menu-nav"
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose} className="nav-acc-menu-list">
                  <Link to="/profile">Account</Link>
                </MenuItem>

                <MenuItem onClick={handleClose} className="nav-acc-menu-list">
                  <Link to="/logout" onClick={() => logoutUser()}>
                    <span>Logout</span>
                  </Link>
                </MenuItem>
              </Menu>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Header;
