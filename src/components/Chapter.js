import React, { Component } from "react";

class Chapter extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="container">
          <form>
            <div class="input-group mb-3">
              <span class="input-group-text" id="inputGroup-sizing-default">
                Chapter
              </span>
              <input
                type="text"
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
              />
            </div>
            <div className="mb-3">
              <select name="" id="">
                <option value="">Select here..</option>
                <option value="">Physics</option>
                <option value="">Chemistry</option>
                <option value="">Biology</option>
                <option value="">Astronomy</option>
              </select>
            </div>
            <div class="mb-3">
              <input
                type="file"
                class="form-control"
                id="inputGroupFile04"
                aria-describedby="inputGroupFileAddon04"
                aria-label="Upload"
              />
            </div>
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default Chapter;
