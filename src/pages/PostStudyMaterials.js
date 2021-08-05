import React, { Component } from "react";
import { Menu } from "antd";
import "antd/dist/antd.css";
import { AppstoreOutlined, MailOutlined } from "@ant-design/icons";

const { SubMenu } = Menu;

class PostStudyMaterials extends Component {
  state = {
    currentSub: "",
    subject: ["Science", "EPH"],
  };

  createSubject = (e) => {
    e.preventDefault();
    this.setState({ subject: [...this.state.subject, this.state.currentSub] });
    this.setState({ currentSub: "" });
  };

  render() {
    return (
      <Menu
        style={{ width: 256 }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
      >
        <SubMenu key="sub1" icon={<MailOutlined />} title="Study-Materials">
          {this.state.subject.map((sub, index) => {
            return (
              <Menu.Item key={index}>
                <div className="post-topic">
                  <a href="/add-chapter" class="">
                    {sub}
                  </a>
                </div>
              </Menu.Item>
            );
          })}

          <Menu.Item className="sub-inputwrap">
            <div class="">
              <input
                type="text"
                className="form-control"
                id="subjectInput"
                value={this.state.currentSub}
                onChange={(event) => {
                  this.setState({
                    currentSub: event.target.value,
                  });
                  console.log("onchange currentsub", this.state.currentSub);
                }}
                placeholder="New Subject"
              />
              <button
                type="button"
                onClick={(e) => {
                  this.createSubject(e);
                }}
                class="btn btn-primary"
              >
                Create subject
              </button>
            </div>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Quiz">
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
        </SubMenu>
      </Menu>
    );
  }
}

export default PostStudyMaterials;
