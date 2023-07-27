import { useSelector } from "react-redux";
import Login from "../user/components/Login";

const Welcome = () => {
  const user = useSelector((state) => state.user);

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
        <br /> {import.meta.env.VITE_TITLE.toUpperCase()}
      </h1>
      {user.username === "" && <Login />}
    </>
  );
};

export default Welcome;
