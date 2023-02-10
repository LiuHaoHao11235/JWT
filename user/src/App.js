import HomePage from "./HomePage/Home.js";
import { ProtectedRoute } from "./ProteactedRoute.js";
import User from "./UserPage/User.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import { Helmet } from "react-helmet";
import IntroPage from "./IntroducePage/Intro.js";
const LoginPage = React.lazy(() => import("./LoginPage/Login.js"));
function App() {
  return (
    <div>
      <Helmet>
        <html lang="en" />
        <title>React Helmet Tutorial</title>
        <meta name="keywords" content="free house to live"></meta>
        <meta
          name="description"
          content="welcome to my house i will provide you a room"
        />
        <meta name="theme-color" content="#E6E6FA" />
      </Helmet>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/*" element={<HomePage></HomePage>}></Route>
            <Route path="login/*" element={<LoginPage></LoginPage>}></Route>
            <Route
              path="user/"
              element={
                <ProtectedRoute>
                  <User></User>
                </ProtectedRoute>
              }
            ></Route>
            <Route path="intro" element={<IntroPage></IntroPage>}></Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}
export default App;
