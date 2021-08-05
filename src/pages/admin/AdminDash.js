import React from "react";
import { Container, Grid } from "@material-ui/core";
import Totals from "../../components/admin-components/Totals";

const AdminDash = () => {
  return (
    <div className="adm-base-style adm-dash">
      <Container maxWidth={true}>
        <Grid container spacing={3}>
          <Grid item lg={3} md={3} xl={12} sm={6} xs={12}>
            <Totals type="users" no="500" />
          </Grid>
          <Grid item lg={3} md={3} xl={12} sm={6} xs={12}>
            <Totals type="Questions" no="2000" />
          </Grid>
          <Grid item lg={3} md={3} xl={12} sm={6} xs={12}>
            <Totals type="Answers" no="8000" />
          </Grid>
          <Grid item lg={3} md={3} xl={12} sm={6} xs={12}>
            <Totals type="Tags" no="1000" />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AdminDash;
