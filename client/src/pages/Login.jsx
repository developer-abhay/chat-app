import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  TextField,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import React, { useEffect, useState } from "react";
import { VisuallyHiddenInput } from "../components/styled/StyledComponents";
import { bgGradient } from "../constants/colors";
import { validateFormInput } from "../utils/validators";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/UserSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(true);
  // User Data states
  const [profilePhoto, setProfilePhoto] = useState({});
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");

  // const updateProfilePhoto = (e) => {
  // setProfilePhoto({
  //   name: e.target.files[0].name,
  //   type: e.target.files[0].type,
  //   size: e.target.files[0].size,
  //   url: window.URL.createObjectURL(e.target.files[0]),
  // });

  // };

  // Login Function
  const loginUser = async (e) => {
    e.preventDefault();
    const config = {
      method: "post",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userName,
        password: password,
      }),
    };
    const response = await fetch(
      "http://localhost:3001/api/v1/user/login",
      config
    );
    if (response.ok) {
      const data = await response.json();
      dispatch(login(data.user));
      navigate("/");
    } else {
      console.log("There was some error");
    }
  };

  // SignUp Function
  const registerUser = async (e) => {
    e.preventDefault();
    // validateFormInput(profilePhoto, name, userName, password);

    const config = {
      method: "post",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userName,
        password,
        name,
        bio,
        avatar: profilePhoto,
      }),
    };
    const response = await fetch(
      "http://localhost:3001/api/v1/user/signup",
      config
    );
    if (response.ok) {
      const data = await response.json();
      // dispatch(login(data.user));
      console.log(profilePhoto);
      console.log(data.user);
      // navigate("/");
    } else {
      console.log(response);
    }
  };

  return (
    <div
      style={{
        background: bgGradient,
      }}
    >
      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: "100%",

            padding: 4,
          }}
        >
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            onSubmit={isLogin ? loginUser : registerUser}
          >
            {isLogin ? (
              <>
                <h1>Login</h1>

                <TextField
                  id="username"
                  type="username"
                  label="Username"
                  placeholder="@IamUser"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  sx={{ mt: 2 }}
                  fullWidth
                  required
                  helperText=" "
                />
                <TextField
                  id="password"
                  type="password"
                  placeholder="Abc123#"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  required
                  helperText=" "
                />
              </>
            ) : (
              <>
                <h1>Sign Up</h1>
                <div style={{ position: "relative" }}>
                  <Avatar
                    src={profilePhoto?.url}
                    style={{
                      width: "100px",
                      height: "100px",
                      border: "1px solid lightgray",
                    }}
                  />
                  <IconButton
                    sx={{
                      width: "35px",
                      height: "35px",
                      position: "absolute",
                      bottom: "0px",
                      right: "0px",
                      bgcolor: "rgba(0,0,0,0.2)",
                      ":hover": {
                        bgcolor: "rgba(0,0,0,0.4)",
                      },
                    }}
                    component="label"
                  >
                    <CameraAltIcon />
                    <VisuallyHiddenInput
                      type="file"
                      onChange={(e) => setProfilePhoto(e.target.files[0])}
                    />
                  </IconButton>
                </div>
                <TextField
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{ mt: 2 }}
                  required
                  fullWidth
                  helperText=" "
                />

                <TextField
                  name="username"
                  type="text"
                  placeholder="@IamUser"
                  label="Username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  fullWidth
                  required
                  helperText=" "
                />
                <TextField
                  type="text"
                  placeholder="Coding Enthusiast"
                  label="Bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  fullWidth
                  helperText=" "
                />
                <TextField
                  name="password"
                  type="password"
                  placeholder="Abc123#"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  required
                  helperText=" "
                />
              </>
            )}
            <Button
              value={isLogin ? "Login" : "Signup"}
              sx={{ mt: 1, mb: 1 }}
              fullWidth
              variant="contained"
              type="submit"
            >
              {isLogin ? "Login" : "Signup"}
            </Button>

            <Button
              sx={{ textTransform: "Capitalize" }}
              variant="text"
              fullWidth
              onClick={() => setIsLogin((prev) => !prev)}
            >
              {isLogin
                ? "Don't have an account? Sign Up"
                : "Already a User? Login"}
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
