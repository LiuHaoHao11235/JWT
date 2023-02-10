import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Grow from "@mui/material/Grow";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import myaxios from "../api/axios";
const Copyright = () => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      fontSize={"16px"}
      fontWeight={600}
    >
      {"Copyright © 2023 Design with MUI by "}
      <Link color="inherit" href="https://github.com/">
        Liu-Tong-Hao
      </Link>{" "}
      {"."}
    </Typography>
  );
};
const TitleSection = styled.div`
  text-shadow: 5px 5px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000,
    -1px 1px 0 #000, 1px 1px 0 #000;
  width: 100vw;
  height: 300px;
  background: url(data:image/jpeg;base64,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);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ContentSection = styled.div`
  width: 100vw;
  height: 500px;
  background: url(http://p3-sign.bdxiguaimg.com/tos-cn-p-0015/6e7945214e83477d8545c6d277fa6be8~tplv-pk90l89vgd-crop-center:864:486.jpeg?x-expires=1701232393&x-signature=IsUjrML%2BuhzPRZmCJ4P3wECvHNE%3D);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const FooterSection = styled.div`
  width: 100vw;
  height: 150px;
  background: lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default function StickyFooter() {
  const [titlein, setTitlein] = useState(false);
  const [accessable, setAccessable] = useState("");

  const jwt_authenticate = async () => {
    try {
      const authenticate_result = await myaxios.post("/login");
      sessionStorage.setItem("access", authenticate_result.data.access);
      sessionStorage.setItem(
        "data",
        JSON.stringify(authenticate_result.data.data)
      );
      setAccessable(() => {
        console.log("SET", authenticate_result.data.access);
        return authenticate_result.data.access;
      });
    } catch (err) {
      sessionStorage.setItem("access", "false");
      sessionStorage.setItem("data", "{}");
      setAccessable(() => {
        return "false";
      });
    }
  };
  console.log(accessable);
  useEffect(() => {
    jwt_authenticate();
    setTimeout(() => {
      setTitlein(true);
    }, 1000);
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <CssBaseline />
      <TitleSection>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom>
            <Grow orientation="horizontal" in={titlein}>
              {
                <span style={{ fontWeight: "800", color: "white" }}>
                  歡迎來到我的家
                </span>
              }
            </Grow>
          </Typography>
          <Typography variant="h2" component="h1" gutterBottom>
            <Grow
              style={{ transformOrigin: "0 0 0" }}
              in={titlein}
              {...(titlein ? { timeout: 1000 } : {})}
            >
              {
                <span style={{ fontWeight: "600", color: "white" }}>
                  提供你舒服的房間
                </span>
              }
            </Grow>
          </Typography>
        </Box>
      </TitleSection>
      <ContentSection>
        <Typography variant="h3" component="h1" gutterBottom>
          <Grow
            style={{ transformOrigin: "0 0 0" }}
            in={titlein}
            {...(titlein ? { timeout: 4000 } : {})}
          >
            {accessable === "true" ? (
              <Link to="user" style={{ textDecoration: "none" }}>
                <Button
                  variant="text"
                  sx={{
                    fontWeight: "500",
                    width: "250px",
                    fontSize: "28px",
                    backgroundColor: "white",
                    ":hover": {
                      bgcolor: "primary.main", // theme.palette.primary.main
                      color: "white",
                    },
                  }}
                >
                  開始使用
                </Button>
              </Link>
            ) : (
              <Link to="login" style={{ textDecoration: "none" }}>
                <Button
                  variant="text"
                  sx={{
                    fontWeight: "500",
                    width: "250px",
                    fontSize: "28px",
                    backgroundColor: "white",
                    ":hover": {
                      bgcolor: "primary.main", // theme.palette.primary.main
                      color: "white",
                    },
                  }}
                >
                  開始使用
                </Button>
              </Link>
            )}
          </Grow>
        </Typography>
      </ContentSection>
      <FooterSection>
        <Copyright />
      </FooterSection>
    </Box>
  );
}
