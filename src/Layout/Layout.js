import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AdminDashSidebar from "../components/admin-components/AdminDashSidebar";
import Grid from "@material-ui/core/Grid";

const Layout = (props) => {
  const [user] = useState(JSON.parse(localStorage.getItem("user")) || []);

  return (
    <div className="main-container">
      <Grid container>
        <Grid item xs={12} className="base-nav-height">
          <Header {...props} />
        </Grid>
        {user.admin === "token" ? <AdminDashSidebar /> : <></>}
        {props?.children}
        <Grid
          item
          xs={12}
          className={user.admin === "token" ? "side-admin-padding" : ""}
        >
          <Footer />
        </Grid>
      </Grid>
    </div>
  );
};

export default Layout;
