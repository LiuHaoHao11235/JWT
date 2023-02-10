import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styled from "@emotion/styled";
import { Link, Navigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import myaxios from "../api/axios";
import { useSessionStorage } from "../useSessionStorage";
import { useState } from "react";
const Pagewarp = styled.div`
  width: 100%;
  height: 100vh;
  background: url(https://img.1ppt.com/uploads/allimg/2205/1_220521170315_1.JPG);
  background-size: cover;
  position: absolute;
`;
const Loginbackground = styled.div`
  width: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 5px 5px 10px grey;
  background-color: rgba(25, 181, 254, 0.5);
  border: 2px rgba(25, 181, 254, 0.4) solid;
  border-radius: 3px;
`;
const Loginwarp = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      <span>
        <Link to="/about"></Link>
      </span>
    </Typography>
  );
}

const theme = createTheme();
const CssTextField = styled(TextField)({
  boxShadow: "4px 4px 8px 0 rgba(0, 0, 0, 0.2)",
  borderRadius: "6px",
  marginTop: "10px",
  background: "white",
  "& label.Mui-focused": {
    color: "white",
    textShadow:
      "-1px 1px 3px blue,1px 1px 3px blue,1px -1px 0px blue,-1px -1px 0px blue",
    fontSize: "18px",
    fontWeight: "600",
    position: "absolute",
    transform: "translate(13px, -15px) scale(0.8)",
  },
  "& 	.MuiInputLabel-root": {
    fontWeight: "600",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "blue",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "rgba(25, 181, 254, 0.6)",
    },
    "&:hover fieldset": {
      borderColor: "blue",
    },
    "&.Mui-focused fieldset": {
      borderColor: "blue",
    },
  },
});
const SignIn = () => {
  const { value: access, setValue: setAccess } = useSessionStorage(
    "access",
    ""
  );
  const [focusinput, setFocusinput] = useState("");
  const handleonfocus = (e) => {
    setFocusinput(() => {
      return e.target.id;
    });
  };
  const handleonblur = () => {
    setFocusinput(() => {
      return "";
    });
  };
  const [error, setError] = useState(false);
  const { setValue: setData } = useSessionStorage("data", "");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    try {
      const response = await myaxios.post("login", {
        password: data.get("password"),
        username: data.get("email"),
      });
      if (response.data.token) {
        console.log("伺服器產生的新Token為", response.data.token);
        localStorage.setItem("token", response.data.token);
      }
      setAccess(() => {
        return response.data.access;
      });
      setData(() => {
        return response.data.data;
      });
    } catch (err) {
      setError(() => {
        return true;
      });
      setTimeout(() => {
        setError(() => {
          return false;
        });
      }, 1500);
      console.log(err);
    }
  };
  console.log("access", access);
  return (
    <Loginwarp>
      <ThemeProvider theme={theme}>
        {access === true ? (
          <Navigate to="../user" replace={true}></Navigate>
        ) : null}
        <Loginbackground>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar
                sx={{ m: 1, bgcolor: "secondary.main" }}
                style={{
                  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                }}
              >
                <LockOutlinedIcon />
              </Avatar>
              <Typography
                component="h1"
                variant="h5"
                style={{
                  fontWeight: "500",
                  color: "white",
                  textShadow:
                    "-1px 1px 3px rgba(25, 181, 254, 0.5),1px 1px 3px rgba(25, 181, 254, 0.5),1px -1px 0px rgba(25, 181, 254, 0.5),-1px -1px 0px rgba(25, 181, 254, 0.5)",
                }}
              >
                Sign in
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <CssTextField
                  margin="normal"
                  fullWidth
                  id="email"
                  label={focusinput === "email" ? "Email" : "Enter your email"}
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onFocus={handleonfocus}
                  onBlur={handleonblur}
                />
                <CssTextField
                  fullWidth
                  label={
                    focusinput === "password"
                      ? "Password"
                      : "Enter your password"
                  }
                  name="password"
                  id="password"
                  type="password"
                  security="true"
                  onFocus={handleonfocus}
                  onBlur={handleonblur}
                />
                <Grid container>
                  <Grid item xs={8}>
                    <FormControlLabel
                      style={{ marginTop: "20px" }}
                      control={
                        <Checkbox
                          value="remember"
                          color="primary"
                          sx={{
                            "&.Mui-checked": {
                              color: "#800080",
                            },
                            "&.MuiCheckbox-root": {
                              color: "#800080",
                            },
                          }}
                        />
                      }
                      label="記住帳號密碼"
                    />
                  </Grid>

                  <Grid item xs={4} style={{ marginTop: "30px" }}>
                    <Link
                      href="#"
                      variant="body2"
                      style={{
                        letterSpacing: "2px",
                        fontWeight: "600",
                      }}
                    >
                      忘記密碼?
                    </Link>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  style={{
                    fontWeight: "500",
                    fontSize: "22px",
                    color: "white",
                    textShadow:
                      "-1px 1px 3px rgba(25, 181, 254, 0.5),1px 1px 3px rgba(25, 181, 254, 0.5),1px -1px 0px rgba(25, 181, 254, 0.5),-1px -1px 0px rgba(25, 181, 254, 0.5)",
                  }}
                >
                  登入
                </Button>
                <Typography
                  sx={{ mt: 3, mb: 2 }}
                  style={{
                    textAlign: "center",
                    fontWeight: "400",
                    fontSize: "18px",
                    color: "white",
                    textShadow:
                      "-1px 1px 3px rgba(25, 181, 254, 0.5),1px 1px 3px rgba(25, 181, 254, 0.5),1px -1px 0px rgba(25, 181, 254, 0.5),-1px -1px 0px rgba(25, 181, 254, 0.5)",
                  }}
                >
                  <span>
                    {"尚未擁有帳號 ? "}
                    <Link
                      style={{
                        color: "black",
                        letterSpacing: "2px",
                        fontWeight: "600",
                      }}
                      to="signup"
                    >
                      點我註冊
                    </Link>
                  </span>
                </Typography>
                {error ? (
                  <Alert
                    sx={{ mt: 1, mb: 0 }}
                    variant="filled"
                    severity="error"
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                      letterSpacing: "1px",
                    }}
                  >
                    帳號或密碼錯誤
                  </Alert>
                ) : null}
              </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Container>
        </Loginbackground>
      </ThemeProvider>
    </Loginwarp>
  );
};
const SignUp = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <Loginwarp>
      <Loginbackground>
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              ,
              <Avatar
                sx={{
                  m: 1,
                  bgcolor: "secondary.main",
                  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                }}
              >
                <LockOutlinedIcon />
              </Avatar>
              <Typography
                component="h1"
                variant="h5"
                style={{
                  fontWeight: "500",
                  color: "white",
                  textShadow:
                    "-1px 1px 3px rgba(25, 181, 254, 0.5),1px 1px 3px rgba(25, 181, 254, 0.5),1px -1px 0px rgba(25, 181, 254, 0.5),-1px -1px 0px rgba(25, 181, 254, 0.5)",
                }}
              >
                Sign up
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <CssTextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CssTextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CssTextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CssTextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value="allowExtraEmails"
                          color="primary"
                          sx={{
                            "&.Mui-checked": {
                              color: "#800080",
                            },
                            "&.MuiCheckbox-root": {
                              color: "#800080",
                            },
                          }}
                        />
                      }
                      label="我接受信箱通知"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Typography
                  sx={{ mt: 3, mb: 2 }}
                  style={{
                    textAlign: "center",
                    fontWeight: "400",
                    fontSize: "18px",
                    color: "white",
                    textShadow:
                      "-1px 1px 3px rgba(25, 181, 254, 0.5),1px 1px 3px rgba(25, 181, 254, 0.5),1px -1px 0px rgba(25, 181, 254, 0.5),-1px -1px 0px rgba(25, 181, 254, 0.5)",
                  }}
                >
                  <span>
                    {"已經擁有帳號 ! "}
                    <Link
                      style={{
                        color: "black",
                        letterSpacing: "2px",
                        fontWeight: "600",
                      }}
                      to=".."
                    >
                      點我登入
                    </Link>
                  </span>
                </Typography>
              </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Container>
        </ThemeProvider>
      </Loginbackground>
    </Loginwarp>
  );
};
const LoginPage = () => {
  return (
    <Pagewarp>
      <Routes>
        <Route path="" element={<SignIn></SignIn>}></Route>
        <Route path="signup" element={<SignUp></SignUp>}></Route>
      </Routes>
    </Pagewarp>
  );
};
export default LoginPage;
