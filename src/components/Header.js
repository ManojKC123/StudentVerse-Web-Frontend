import React, { Component } from 'react'
import SearchIcon from '@material-ui/icons/Search';

class Header extends Component {
    render() {
        return (
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                  <img src="images/logo.png" className="logo" alt=""></img>
                <a href="/" class="navbar-brand">Student<b>Verse</b></a>
                <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div id="navbarCollapse" class="collapse navbar-collapse justify-content-start">
                    <div class="navbar-nav">
                        <a href="#" class="nav-item nav-link">Questions</a>
                        <a href="#" class="nav-item nav-link">About</a>
                        <a href="#" class="nav-item nav-link">Contact</a>
                    </div>
                    <form class="navbar-form form-inline">
                        <div class="input-group search-box">
                            <input type="text" id="search" class="form-control" placeholder="Search here..." />
                            <div class="input-group-append">
                                <span class="input-group-text">
                                    <SearchIcon className=""/>
                                    </span>
                            </div>
                        </div>
                    </form>
                    <div class="navbar-nav ml-auto action-buttons">
                        <a href="/login" class="nav-link">Login</a>
                        <a href="/signup" class="btn btn-primary dropdown-toggle sign-up-btn">Sign up</a>
                    </div>
                </div>
            </nav>
            )
        }
    }
export default Header;