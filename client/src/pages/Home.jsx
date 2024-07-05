import React from "react";
import Sidebar from "../components/styled/Sidebar/Sidebar";
import ChatIcon from "@mui/icons-material/Chat";
import ChatScreen from "../components/styled/ChatScreen/ChatScreen";
import { Box, Container } from "@mui/material";

const Home = () => {
  console.log("Hello");
  return (
    <div className="app-body">
      <Sidebar />
      <Box sx={{ bgcolor: "black", width: "100%" }}>{/* <ChatIcon /> */}</Box>
      {/* <ChatScreen /> */}
    </div>
  );
};

export default Home;
