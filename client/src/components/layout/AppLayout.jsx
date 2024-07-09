import React from "react";
import Header from "./Header";
import Sidebar from "../styled/Sidebar";
import { Box, Container, Grid, Stack } from "@mui/material";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    return (
      <Stack sx={{ height: "100vh" }}>
        <Header />
        <Grid container sx={{ overflow: "hidden", height: "100%" }}>
          <Grid
            item
            sm={5}
            md={4}
            lg={3}
            sx={{
              flexgrow: "1",
              display: {
                xs: "none",
                sm: "flex",
                height: "100%",
              },
            }}
          >
            <Sidebar />
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            sm={7}
            lg={9}
            sx={{
              display: "flex",
              height: "100%",
            }}
          >
            <WrappedComponent {...props} />
            {/* chatId={chatId} user={user} */}
          </Grid>
        </Grid>
      </Stack>
    );
  };
};

export default AppLayout;
