import React from "react";
import Sidebar from "../components/styled/Sidebar/Sidebar";
import ChatScreen from "../components/styled/ChatScreen/ChatScreen";

const Home = () => {
  return (
    <div className="app-body">
      <Sidebar />
      <ChatScreen />
    </div>
  );
};

export default Home;
