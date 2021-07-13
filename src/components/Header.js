import React, { Component } from 'react'
import SearchIcon from '@material-ui/icons/Search';

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <img src="images/logo.png" className="logo" alt=""></img>
        <a href="/" className="navbar-brand">Student<b>Verse</b></a>
        <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div id="navbarCollapse" className="collapse navbar-collapse justify-content-start">
          <div className="navbar-nav">
            <a href="/questions" className="nav-item nav-link">Questions</a>
            <a href="/about" className="nav-item nav-link">About</a>
            <a href="/contact" className="nav-item nav-link">Contact</a>
          </div>
          <form className="navbar-form form-inline">
            <div className="input-group search-box">
              <input type="text" id="search" className="form-control" placeholder="Search here..." />
              <div className="input-group-append">
                <span className="input-group-text">
                  <SearchIcon className="" />
                </span>
              </div>
            </div>
          </form>
          <div className="navbar-nav ml-auto action-buttons">
            <a href="/login" className="nav-link">Login</a>
            <a href="/signup" className="btn btn-primary">Sign up</a>
          </div>
        </div>
      </nav>
    )
  }
}
export default Header;