import React from "react";
import AdbIcon from "@mui/icons-material/Adb";
import { Container, Stack, Typography } from "@mui/material";
import AppLayout from "../components/layout/AppLayout";

const Home = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <AdbIcon sx={{ fontSize: "50px" }} />
      <Typography variant="h4" mb={2}>
        Textin for the Web
      </Typography>
      <Typography>
        A web app made using the MERN Stack and socket.io
        <br />
        Send and receive messages instantly.
      </Typography>
    </Container>
  );
};

export default AppLayout()(Home);
