import React from "react";
import { useSelector } from "react-redux";
import Login from "../user/components/Login";

const Welcome = () => {
  const user = useSelector((state) => state.user);
  if (!user.username) {
    return <Login />;
  }

  return (
    <>
      <h1 className="pageHead homeTitle" style={{ textAlign: "center" }}>
        <span className="welcome-text">
          Welcome{" "}
          {user && user.employee && user.employee.name
            ? user.employee.name
            : ""}{" "}
          to
        </span>{" "}
        <br /> {import.meta.env.VITE_TITLE?.toLowerCase?.()}
      </h1>
    </>
  );
};

export default Welcome;
