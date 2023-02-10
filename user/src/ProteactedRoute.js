import React from "react";
import { RedirectPage } from "./RedirectPage/index";
export const ProtectedRoute = ({ children }) => {
  const access = sessionStorage.getItem("access");
  console.log("protected route access", access);
  if (access === "true") {
    return children;
  } else {
    return (
      <RedirectPage title="請先登入後再嘗試!!" delay={3000}></RedirectPage>
    );
  }
};
