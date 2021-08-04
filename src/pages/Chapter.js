import React, { Component } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
class Chapter extends Component {
  render() {
    return (
      <div class="jumbotron">
        <div class="row w-100">
          <div class="col-md-3">
            <div class="card border-info mx-sm-1 p-3">
              <div class="text-info text-center mt-3">
                <h4>Cars</h4>
              </div>
              <div class="text-info text-center mt-2">
                <h1>234</h1>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card border-success mx-sm-1 p-3">
              <div class="text-success text-center mt-3">
                <h4>Eyes</h4>
              </div>
              <div class="text-success text-center mt-2">
                <h1>9332</h1>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card border-danger mx-sm-1 p-3">
              <div class="text-danger text-center mt-3">
                <h4>Hearts</h4>
              </div>
              <div class="text-danger text-center mt-2">
                <h1>346</h1>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card border-warning mx-sm-1 p-3">
              <div class="text-warning text-center mt-3">
                <h4>Inbox</h4>
              </div>
              <div class="text-warning text-center mt-2">
                <h1>346</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Chapter;
