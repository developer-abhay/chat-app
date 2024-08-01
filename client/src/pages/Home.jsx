import AdbIcon from "@mui/icons-material/Adb";
import { Container, Typography } from "@mui/material";
import AppLayout from "../components/layout/AppLayout";
import { useEffect } from "react";
import { updateChatId } from "../redux/UserSlice";
import { useDispatch } from "react-redux";
import { getSocket } from "../lib/socket";
import { useNavigate } from "react-router-dom";
import { fetchAllChats } from "../api/api";

const Home = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(updateChatId(null));
  }, []);

  useEffect(() => {
    if (user?._id) {
      const socket = getSocket();
      //Updating chats when removed from group
      socket.on("removed-from-group", async (data) => {
        navigate("/");
        await fetchAllChats(user._id, dispatch);
      });

      socket.on("made-admin", async (data) => {
        await fetchAllChats(user._id, dispatch);
      });
    }
  }, [user]);

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
