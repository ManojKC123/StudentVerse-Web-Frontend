import React from "react";
import { Link } from "react-router-dom";
import { Dashboard, MenuBook, Category } from "@material-ui/icons/";

function AdminDashSidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-inner">
        <ul>
          <Link to="/admin">
            <li>
              <Dashboard className="sidebar-icons" />
              Dashboard
            </li>
          </Link>
          <Link to="/admin/study-materials">
            <li>
              <MenuBook className="sidebar-icons" />
              Study Materials
            </li>
          </Link>
          <Link to="admin/quiz">
            <li>
              <Category className="sidebar-icons" />
              Quiz
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default AdminDashSidebar;
