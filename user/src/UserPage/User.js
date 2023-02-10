import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import ListItemButton from "@mui/material/ListItemButton";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import Alert from "@mui/material/Alert";
function MiddleDividers() {
  const [islogout, setIslogout] = useState(false);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    setIslogout(() => {
      return true;
    });
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  const info = JSON.parse(sessionStorage.getItem("data"));
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: "orange" }}>{info.name[0]}</Avatar>
        </ListItemAvatar>
        <ListItemText primary="使用者" secondary={info.name} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar
            sx={{
              color: "white",
              backgroundColor: "green",
            }}
          >
            <LocalPhoneIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="連絡電話" secondary={info.phonenumber} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar
            sx={{
              color: "white",
              backgroundColor: "skyblue",
            }}
          >
            <ChildCareIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="使用者年齡" secondary={info.age} />
      </ListItem>
      {islogout ? (
        <Alert severity="success">成功登出{info.name}的帳號</Alert>
      ) : (
        <ListItemButton style={{ color: "blue" }} onClick={logout}>
          登出使用者
        </ListItemButton>
      )}
    </List>
  );
}
export default function User() {
  return <MiddleDividers></MiddleDividers>;
}
