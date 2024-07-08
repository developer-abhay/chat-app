import React from "react";
import Header from "./Header";
import Sidebar from "../styled/Sidebar/Sidebar";
import ChatScreen from "../styled/ChatScreen/ChatScreen";
import { Box, Container, Stack } from "@mui/material";

const AppLayout = () => {
  return (
    <Stack sx={{ height: "100vh" }}>
      <Header />
      <Container
        maxWidth="xl"
        style={{
          height: "100%",
          display: "flex",
          margin: "auto",
        }}
      >
        <Sidebar />
        <ChatScreen />
      </Container>
    </Stack>
  );
};

export default AppLayout;
