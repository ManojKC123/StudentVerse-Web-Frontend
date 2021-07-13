import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Grid from "@material-ui/core/Grid";

const Layout = (props) => {
  // const [user] = useState(
  //   JSON.parse(localStorage.getItem("user")) || { isLoggedin: false }
  // );

  return (
    <div className="main-container">
      <Grid container>
        <Grid item xs={12} className="base-height">
          <Header {...props} />
        </Grid>
        {props?.children}
        <Grid item xs={12}>
          <Footer />
        </Grid>
      </Grid>
    </div>
  );
};

export default Layout;
