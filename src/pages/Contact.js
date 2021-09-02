import React, { Component } from "react";

export default class Contact extends Component {
  render() {
    return (
      <div>
        <h2 className="get">Get in Touch</h2>

        <div className="row">
          <div className="col-md-4 mb-5">
            <div className="card h-100">
              <img
                className="card-img-top"
                src="https://www.nicepng.com/png/detail/663-6632602_green-address-icon-png.png"
                alt=""
              />
              <div className="card-body">
                <h4 className="card-title">ADDRESS</h4>
                <p className="card-text">
                  {" "}
                  Softwarica College of It and E-commerce Dilibazar, Kathmandu
                  Nepal
                </p>
                <h4 className="card-title">Contact With</h4>
                <p className="card-text">
                  {" "}
                  Scrum Master: Manoj KC
                  <p>Balkot, Bhaktapur</p>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-5">
            <div className="card h-100">
              <img
                className="card-img-top"
                src="https://www.pngitem.com/pimgs/m/207-2077873_mobile-banking-icon-mobile-banking-logo-hd-png.png"
                alt=""
              />
              <div className="card-body">
                <h4 className="card-title">PHONE</h4>
                <p className="card-text">
                  {" "}
                  StudentVerse Group Contracting
                  <p>Phone no: 01-4425661, 01-4441577 </p>
                  <p>Scrum Master: Manoj Kc</p>
                  <p>Phone no: 9803103338</p>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-5">
            <div className="card h-100">
              <img
                className="card-img-top"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSLTWi8oEgLnF9st6cvP7x8AkOQhrS89ShtQ&usqp=CAU"
                alt=""
              />
              <div className="card-body">
                <h4 className="card-title">EMAIL</h4>
                <p className="card-text"> Email: hello@softwarica.edu.np</p>
                <p>Scrum Master: Manoj Kc</p>
                <p>Email: manoj_kc12@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
