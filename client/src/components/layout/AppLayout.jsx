import Header from "./Header";
import Sidebar from "../styled/Sidebar";
import { Grid, Stack } from "@mui/material";

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
              },
              height: "100%",
            }}
          >
            <Sidebar />
          </Grid>
          <Grid
            item
            sm={7}
            md={8}
            lg={9}
            sx={{
              display: { xs: "none", sm: "flex" },
              height: "100%",
            }}
          >
            <WrappedComponent {...props} />
          </Grid>
          <Grid
            item
            xs={12}
            sm={0}
            sx={{
              display: { xs: "flex", sm: "none" },
              height: "100%",
            }}
          >
            {WrappedComponent.name === "Home" ? (
              <Sidebar />
            ) : (
              <WrappedComponent {...props} />
            )}
          </Grid>
        </Grid>
      </Stack>
    );
  };
};

export default AppLayout;
