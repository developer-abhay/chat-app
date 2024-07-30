import AdbIcon from "@mui/icons-material/Adb";
import { Container, Typography } from "@mui/material";
import AppLayout from "../components/layout/AppLayout";
import { useEffect } from "react";
import { updateChatId } from "../redux/UserSlice";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateChatId(null));
  }, []);
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
