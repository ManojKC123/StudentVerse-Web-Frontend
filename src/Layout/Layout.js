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
        <Grid item md={12}>
          <div className="page-container">
            <>
              {user.userType === "Admin" ? (
                <AdminDashSidebar />
              ) : (
                <HomeDashSidebar />
              )}
            </>
            <>{props?.children}</>
          </div>
        </Grid>
        <Grid item xs={12} className="">
          <Footer className="col-md-10" />
        </Grid>
      </Grid>
    </div>
  );
};

export default Layout;
