import React, { Component } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

import english from "../media/english.jpg";
import maths from "../media/maths.jpeg";
import science from "../media/science.jpg";
import computer from "../media/computer.jpg";

toast.configure();
class StudyMaterials extends Component {
  render() {
    return (
      <div class="cards-list">
        <div class="card-studymaterials">
          <div class="card_image">
            {" "}
            <img src={english} />{" "}
          </div>

          <div class="card_title title">
            <p>Card Title</p>
          </div>
        </div>
        <div class="card-studymaterials">
          <div class="card_image">
            <img src={maths} href="/chapter" />
          </div>
          <div class="card_title title-white">
            <p>Card Title</p>
          </div>
        </div>
        <div class="card-studymaterials">
          <div class="card_image">
            <img src={science} />
          </div>
          <div class="card_title">
            <p>Card Title</p>
          </div>
        </div>
        <div class="card-studymaterials">
          <div class="card_image">
            <img src={computer} />
          </div>
          <div class="card_title title-white">
            <p>Card Title</p>
          </div>
        </div>
      </div>
    );
  }
}
export default StudyMaterials;
