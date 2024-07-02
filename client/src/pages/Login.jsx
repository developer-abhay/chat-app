import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import React, { useState } from "react";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [photoURL, setPhotoURL] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Container component={"main"} maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isLogin ? (
          <>
            <h1>Login</h1>

            <TextField
              type="text"
              placeholder="@IamUser"
              label="Username"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
                console.log(name);
              }}
              required
              // error
              // helperText="Incorrect Entry"
            />
            <TextField
              type="password"
              placeholder="Abc123#"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              // error
              // helperText="Incorrect Entry"
            />
          </>
        ) : (
          <>
            <h1>Sign Up</h1>
            <Avatar
              src={photoURL}
              style={{ width: "100px", height: "100px", border: "1px solid" }}
            />
            <IconButton>
              <label for="profile-photo">
                <CameraAltIcon />
              </label>
            </IconButton>
            <input
              id="profile-photo"
              type="file"
              onChange={(e) =>
                setPhotoURL(window.URL.createObjectURL(e.target.files[0]))
              }
              hidden
            />

            <TextField
              type="text"
              placeholder="Your Name"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              // error
              // helperText="Incorrect Entry"
            />

            <TextField
              type="text"
              placeholder="@IamUser"
              label="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              // error
              // helperText="Incorrect Entry"
            />
            <TextField
              type="text"
              placeholder="Coding Enthusiast"
              label="Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              // required
              // error
              // helperText="Incorrect Entry"
            />
            <TextField
              type="password"
              placeholder="Abc123#"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              // error
              // helperText="Incorrect Entry"
            />
          </>
        )}
        <Button variant="contained" color="primary">
          {isLogin ? "Login" : "Signup"}
        </Button>
        <Typography>OR</Typography>
        <Button onClick={(e) => setIsLogin((prev) => !prev)}>
          {isLogin ? "signUp" : "Login"}
        </Button>
      </Paper>
    </Container>
  );
};

export default Login;
