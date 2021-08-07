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
      <div className="cards-list">
        <div className="card-studymaterials">
          <div className="card_image">
            <img src={english} alt="" />
          </div>

          <div className="card_title title">
            <p>Card Title</p>
          </div>
        </div>
        <div className="card-studymaterials">
          <div className="card_image">
            <img src={maths} href="/chapter" alt="" />
          </div>
          <div className="card_title title-white">
            <p>Card Title</p>
          </div>
        </div>
        <div className="card-studymaterials">
          <div className="card_image">
            <img src={science} alt="" />
          </div>
          <div className="card_title">
            <p>Card Title</p>
          </div>
        </div>
        <div className="card-studymaterials">
          <div className="card_image">
            <img src={computer} alt="" />
          </div>
          <div className="card_title title-white">
            <p>Card Title</p>
          </div>
        </div>
      </div>
    );
  }
}
export default StudyMaterials;
