import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AdminDashSidebar from "../components/admin-components/AdminDashSidebar";
import Grid from "@material-ui/core/Grid";
import HomeDashSidebar from "../components/HomeDashSidebar";

const Layout = (props) => {
  const [user] = useState(JSON.parse(localStorage.getItem("user")) || []);
  console.log("user", user);

  return (
    <div className="main-container">
      <Grid container>
        <Grid item xs={12} className="base-nav-height">
          <Header {...props} />
        </Grid>
        <Grid item xs={2} className="">
          {user.userType === "Admin" ? (
            <AdminDashSidebar />
          ) : (
            <HomeDashSidebar className="col-md-2" />
          )}
        </Grid>
        <Grid item xs={10} className="">
          {props?.children}
        </Grid>
        <Grid
          item
          xs={12}
          className={user.userType === "Admin" ? "side-admin-padding" : ""}
        >
          <Footer className="col-md-10" />
        </Grid>
      </Grid>
    </div>
  );
};

export default Layout;
