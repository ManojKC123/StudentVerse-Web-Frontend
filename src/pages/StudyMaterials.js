import React, { Component } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

import english from "../media/english.jpg";
import maths from "../media/maths.jpeg";
import science from "../media/science.jpg";
import computer from "../media/computer.jpg";
import { getSubject } from "../data/api";

toast.configure();

class StudyMaterials extends Component {
  state = {
    subjects: [],
    user: JSON.parse(localStorage.getItem("user")) || [],
  };
  componentDidMount() {
    getSubject(this.state.user.token)
      .then((response) => {
        console.log("get subject", response);
        this.setState({
          subjects: response.data,
        });
        console.log("subjects", this.state.subjects);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }
  render() {
    return (
      <div className="subejct-materials">
        <div className="container-fluid">
          <div className="cards-list">
            {this.state.subjects &&
              this.state.subjects.map((sub, index) => {
                return (
                  <Link
                    to={{
                      pathname: `/study-materials/${sub.name}`,
                      propsParam: { id: sub._id },
                    }}
                    key={index}
                  >
                    <div className="card-studymaterials">
                      <div className="card_image">
                        <img
                          src={`https://student-verse.herokuapp.com/subject/${sub.pictureName}`}
                          alt=""
                        />
                      </div>

                      <div className="card_title title">
                        <p>{sub.name}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>

        {/* <div className="card-studymaterials">
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
        </div> */}
      </div>
    );
  }
}
export default StudyMaterials;
