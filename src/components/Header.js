import React, { useState, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userImage from "../media/user.png";
import { getProfile } from "../data/api";
import { div } from "prelude-ls";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";

toast.configure();

const Header = (props) => {
  const [user] = useState(JSON.parse(localStorage.getItem("user")) || []);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [initials, setInitials] = useState("");
  const [userPP, setUserPP] = useState();
  const [searchText, setSearchText] = useState("");
  const [notifDrop, setNotifDrop] = useState(false);

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
    localStorage.clear();
    toast.success("Logout Succesfull !!!", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    setTimeout(function () {
      window.location.href = "/";
    }, 1000);
    //   })
    //   .catch((err) => {
    //     console.log("Logout Error", err);
    //   });
  };

  useEffect(() => {
    getProfile(user.token)
      .then((response) => {
        if (response.success === true && response.data.userPP) {
          setUserPP();
        }
        if (response.success === true) {
          setInitials(
            response.data.fname.charAt(0).toUpperCase() +
              response.data.lname.charAt(0).toUpperCase()
          );
        }
      })
      .catch((err) => {
        console.log("Profile Error", err);
      });
  }, [props, user]);

  const searchPosts = (searchText) => {
    if (searchText === "") {
      return;
    }
    window.location.href = `/search-results/${searchText.searchText}`;
  };

  const dropNotification = (e) => {
    setNotifDrop(!notifDrop);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
      <a href="/" className="navbar-brand">
        <img src="images/logo.png" className="logo" alt="Logo" />
      </a>
      <form className="navbar-form resp-show form-inline">
        <div className="input-group search-box">
          <input
            type="text"
            id="search-posts"
            className="form-control"
            placeholder="Search questions here..."
            onChange={(event) => {
              setSearchText({
                searchText: event.target.value,
              });
            }}
          />
          <div className="input-group-append">
            <span className="input-group-text">
              <SearchIcon
                id="search-button"
                onClick={() => searchPosts(searchText)}
                className=""
              />
            </span>
          </div>
        </div>
      </form>
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
            <b>Study Materials</b>
          </Link>
         
        </div>
        <form className="navbar-form resp-hide form-inline">
          <div className="input-group search-box">
            <input
              type="text"
              id="search-posts"
              className="form-control"
              placeholder="Search questions here..."
              onChange={(event) => {
                setSearchText({
                  searchText: event.target.value,
                });
              }}
            />
            <div className="input-group-append">
              <span className="input-group-text">
                <SearchIcon
                  onClick={() => searchPosts(searchText)}
                  className=""
                />
              </span>
            </div>
          </div>
        </form>
        <div className="navbar-nav ml-auto action-buttons">
          <div className="notification-icon-wrap">
            <button className="btn-update-password" onClick={dropNotification}>
              <NotificationsActiveIcon />
            </button>
            <div
              className={
                notifDrop ? "notification-icon show" : "notification-icon"
              }
            >
              <div>
                <span>notification 1</span>
                <span>notification 2</span>
                <span>notification 3</span>
                <span>notification 4</span>
              </div>
            </div>
          </div>
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
                  {/* <AccountCircleIcon className="account-icon" /> */}
                  <div className="img-wrap">
                    {userPP ? (
                      <img src={userImage} alt="" />
                    ) : (
                      <span className="initials-wrap">{initials}</span>
                    )}
                  </div>
                </IconButton>
                <div className="account-name">
                  <span className="block">{user.username}</span>
                  {user.userType === "Admin" ? (
                    <span className="admin-wrap">Admin Login </span>
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
