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
import React, { useEffect, useState } from "react";
import { VisuallyHiddenInput } from "../components/styled/StyledComponents";
import { bgGradient } from "../constants/colors";
import { validateFormInput } from "../utils/validators";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch } from "react-redux";
import { loginUserAPI, registerUserAPI } from "../api/api";

const Login = () => {
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(true);
  const [loginError, setLoginError] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  // User Data states
  const [profilePhoto, setProfilePhoto] = useState({});
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [tempAvatar, setTempAvatar] = useState("");

  const updateAvatar = (e) => {
    setTempAvatar(window.URL.createObjectURL(e.target.files[0]));
    setProfilePhoto(e.target.files[0]);
  };

  // Login Function
  const loginUser = async (e) => {
    e.preventDefault();
    const statusCode = await loginUserAPI(userName, password, dispatch);
    if (statusCode === 404) {
      setLoginError(true);
    }
  };

  // SignUp Function
  const registerUser = (e) => {
    e.preventDefault();
    setErrors({});
    const validationErrors = validateFormInput(
      profilePhoto,
      name,
      userName,
      password,
      bio
    );

    if (validationErrors) {
      console.log(validationErrors);
      setErrors(validationErrors);
    } else {
      const signupForm = new FormData();
      signupForm.append("name", name);
      signupForm.append("username", userName);
      signupForm.append("password", password);
      signupForm.append("bio", bio);
      signupForm.append("avatar", profilePhoto);

      registerUserAPI(signupForm, dispatch);
    }
  };

  return (
    <div
      style={{
        background: bgGradient,
        maxHeight: "fit-content",
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
                  onChange={(e) => {
                    setLoginError(false);
                    setUserName(e.target.value);
                  }}
                  sx={{ my: 2 }}
                  fullWidth
                  required
                  error={loginError}
                />
                <TextField
                  id="password"
                  type="password"
                  placeholder="Abc123#"
                  label="Password"
                  value={password}
                  sx={{ mb: 2 }}
                  onChange={(e) => {
                    setLoginError(false);
                    setPassword(e.target.value);
                  }}
                  fullWidth
                  required
                  error={loginError}
                />
                {loginError && (
                  <Typography
                    variant="caption"
                    color="error"
                    width={"100%"}
                    textAlign={"left"}
                  >
                    Invalid Credentials
                  </Typography>
                )}
              </>
            ) : (
              <>
                <h1>Sign Up</h1>
                <div style={{ position: "relative" }}>
                  <Avatar
                    src={tempAvatar}
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
                      bgcolor: "rgba(0,0,0,0.4)",
                      ":hover": {
                        bgcolor: "rgba(0,0,0,0.8)",
                      },
                    }}
                    component="label"
                  >
                    <CameraAltIcon sx={{ color: "white" }} />
                    <VisuallyHiddenInput
                      type="file"
                      onChange={(e) => {
                        updateAvatar(e);
                        setErrors({ ...errors, avatar: null });
                      }}
                    />
                  </IconButton>
                </div>
                {errors?.avatar && (
                  <Typography
                    sx={{ width: "100%", textAlign: "center" }}
                    variant="caption"
                    color="error"
                    textAlign={"left"}
                  >
                    {errors?.avatar}
                  </Typography>
                )}
                <TextField
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  label="Name"
                  value={name}
                  onChange={(e) => {
                    setErrors({ ...errors, name: null });
                    setName(e.target.value);
                  }}
                  sx={{ mt: 2, mb: 2 }}
                  required
                  fullWidth
                  error={Boolean(errors?.name)}
                  helperText={errors?.name ? errors.name : ""}
                />

                <TextField
                  name="username"
                  type="text"
                  placeholder="@IamUser"
                  label="Username"
                  sx={{ mb: 2 }}
                  value={userName}
                  onChange={(e) => {
                    setErrors({ ...errors, userName: null });
                    setUserName(e.target.value);
                  }}
                  fullWidth
                  required
                  error={Boolean(errors?.userName)}
                  helperText={errors?.userName ? errors.userName : ""}
                />
                <TextField
                  type="text"
                  placeholder="Coding Enthusiast"
                  label="Bio (optional)"
                  value={bio}
                  onChange={(e) => {
                    setErrors({ ...errors, bio: null });
                    setBio(e.target.value);
                  }}
                  fullWidth
                  sx={{ mb: 2 }}
                  error={Boolean(errors?.bio)}
                  helperText={errors?.bio ? errors.bio : ""}
                />
                <div style={{ width: "100%", position: "relative" }}>
                  <TextField
                    name="password"
                    type={passwordVisibility ? "text" : "password"}
                    placeholder="Abc123#"
                    label="Password"
                    value={password}
                    onChange={(e) => {
                      setErrors({ ...errors, password: null });
                      setPassword(e.target.value);
                    }}
                    fullWidth
                    required
                    sx={{ mb: 2, position: "relative" }}
                    error={Boolean(errors?.password)}
                    helperText={errors?.password ? errors.password : ""}
                  />
                  <IconButton
                    sx={{ position: "absolute", right: "10px", top: "8px" }}
                    onClick={() => setPasswordVisibility((prev) => !prev)}
                  >
                    {passwordVisibility ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </div>
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
