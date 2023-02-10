import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const RedirectPage = (props) => {
  const navigate = useNavigate();
  const { delay, title } = props;
  const [delayTime, setDelayTime] = useState(delay);
  useEffect(() => {
    // console.log("set interval");
    const interval = setInterval(() => {
      setDelayTime((delayTime) => delayTime - 1000);
    }, 1000);
    return () => {
      clearInterval(interval);
      // console.log("clear interval");
    };
  }, []);
  useEffect(() => {
    if (delayTime === 0) {
      // console.log("跳轉");
      navigate("/");
    }
  }, [navigate, delayTime]); //!不使用hook方式會跳警告
  console.log("title", title);
  return (
    <div>
      <div>
        <h1
          style={{
            width: "100%",
            color: "black",
            fontSize: "24px",
            fontWeight: "600",
          }}
        >
          {title}
        </h1>
        <h2>
          將在
          <p
            style={{
              color: "red",
              display: "inline",
            }}
          >
            {delayTime / 1000}秒
          </p>
          後跳轉
        </h2>
      </div>
      <br></br>
    </div>
  );
};
