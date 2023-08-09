import React from "react";
import { useSelector } from "react-redux";
import { Footer, Navigation, Header } from "..";
import classes from "./Layout.module.css";
const Layout = (props) => {
  const user = useSelector((state) => state.user);
  return (
    <>
      {user && user.username && (
        <>
          <Header />
          <div className="main-wrap">
            <div className="left-panel">
              <Navigation />
            </div>
            <div className="right-panel">
              <main className={classes.main}>{props.children}</main>
              <Footer />
            </div>
          </div>
        </>
      )}

      {!user.username && (
        <div className="bg-login">
          <div className="bl_login">
            <main className={classes.main}>{props.children}</main>
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
