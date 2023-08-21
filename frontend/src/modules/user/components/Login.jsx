import React, { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
// import {
//   TextField,
//   FormControl,
//   FormHelperText,
//   Button,
//   Paper,
// } from "@mui/material";
import { Alert, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, validateUser } from "@modules/user/slice/userSlice";
import LoadingSpinner from "@ui-controls/LoadingSpinner";
import { setToken, setUserType } from "@services/utils";
import { removeUser, selectIsLoading } from "../slice/userSlice";
import { jsmt, web, tnb_logo_01 } from "../../../assets";
import "./Login.css";

const initialState = {
  username: "",
  password: "",
};

const initialErrorState = {
  username: {
    invalid: false,
    message: "",
  },
  password: {
    invalid: false,
    message: "",
  },
};

const Login = () => {
  const [loginData, setLoginData] = useState(initialState);
  const [formErrors, setFormErrors] = useState(initialErrorState);
  const [httpError, setHttpError] = useState("");
  const isLoading = useSelector(selectIsLoading);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef(null);
  const emailRef = useRef(null);
  useEffect(() => {
    dispatch(removeUser());
  }, []);

  const goToHome = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const validateForm = (formData) => {
    const errors = { ...initialErrorState };
    if (!formData.username || !formData.username?.trim?.()) {
      errors.username = { invalid: true, message: "Username is required" };
      emailRef.current.style.border = "1px solid red";
    }
    if (!formData.password || !formData.password?.trim?.()) {
      errors.password = { invalid: true, message: "Password is required" };
      ref.current.style.border = "1px solid red";
    } else if (formData.password?.trim?.()?.length < 5) {
      errors.password = {
        invalid: true,
        message: "Password length should be 5 or more characters",
      };
      ref.current.style.border = "1px solid red";
    }

    let validationErrors = false;
    for (const key in errors) {
      if (errors[key].invalid === true) {
        validationErrors = true;
      }
    }
    if (validationErrors) {
      setFormErrors(errors);
    }
    return validationErrors;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!validateForm(loginData)) {
      dispatch(validateUser(loginData))
        .then(({ payload = {} }) => {
          if (payload?.data?.message) {
            setHttpError(payload.data.message);
          } else {
            const { token, type } = payload?.data || {};
            setToken(token);
            setUserType(type);
            dispatch(updateUser(payload?.data));
            setHttpError("");
            if (token) {
              goToHome();
            }
          }
        })
        .catch(() => {
          setHttpError(
            "Something went wrong! Please try later or contact Administrator."
          );
        });
    }
  };

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    emailRef.current.style.border = "none";
    ref.current.style.border = "none";
    setLoginData((currState) => {
      return {
        ...currState,
        [name]: value,
      };
    });
  };
  const toggle = () => {
    let toggler = document.getElementById("toggler");
    if (ref.current.type === "text") {
      ref.current.type = "password";
      toggler.classList.remove("far");
      toggler.classList.remove("fa-eye");
      toggler.classList.add("fa-regular");
      toggler.classList.add("fa-eye-slash");
    } else {
      ref.current.type = "text";
      toggler.classList.add("fa-eye");
      toggler.classList.add("far");
      toggler.classList.remove("fa-regular");
      toggler.classList.remove("fa-eye-slash");
    }
  };
  // return (
  //   <>
  //

  //     <Paper sx={{ padding: "20px", marginBottom: "20px" }}>
  //       {httpError !== "" && (
  //         <Stack
  //           sx={{
  //             width: "100%",
  //             margin: "0 0 30px 0",
  //             border: "1px solid red",
  //             borderRadius: "4px",
  //           }}
  //           spacing={2}
  //         >
  //           <Alert severity="error">{httpError}</Alert>
  //         </Stack>
  //       )}
  //       <div className="login-wrap">
  //         <div className="login-logo-pnl">
  //           <img src={logo} alt="" />
  //         </div>
  //         <div className="login-card">
  //           <h2 className="pageHead">Login</h2>
  //           <form onSubmit={submitHandler}>
  //             <div className="grid grid-1-col">
  //               <div className="grid-item">
  //                 <FormControl fullWidth error={formErrors.username.invalid}>
  //                   <TextField
  //                     variant="outlined"
  //                     label="Username"
  //                     error={formErrors.username.invalid}
  //                     value={loginData.username}
  //                     onChange={inputChangeHandler}
  //                     name="username"
  //                     id="username"
  //                     inputProps={{ maxLength: 50 }}
  //                   />
  //                   {formErrors.username.invalid && (
  //                     <FormHelperText>
  //                       {formErrors.username.message}
  //                     </FormHelperText>
  //                   )}
  //                 </FormControl>
  //               </div>
  //               <div className="grid-item">
  //                 <FormControl fullWidth error={formErrors.username.invalid}>
  //                   <TextField
  //                     variant="outlined"
  //                     label="Password"
  //                     type="password"
  //                     error={formErrors.password.invalid}
  //                     value={loginData.password}
  //                     onChange={inputChangeHandler}
  //                     name="password"
  //                     id="password"
  //                     inputProps={{ maxLength: 50 }}
  //                   />
  //                   {formErrors.password.invalid && (
  //                     <FormHelperText>
  //                       {formErrors.password.message}
  //                     </FormHelperText>
  //                   )}
  //                 </FormControl>
  //               </div>
  //               <div className="grig-item right">
  //                 <Button
  //                   variant="contained"
  //                   size="medium"
  //                   type="submit"
  //                   color="primary"
  //                   className="btn-login"
  //                 >
  //                   Login
  //                 </Button>
  //               </div>
  //             </div>
  //           </form>
  //         </div>
  //       </div>
  //     </Paper>
  //   </>
  // );

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <img
              src={tnb_logo_01}
              alt="Transporter NoteBook"
              className="imgontop"
            />
          </div>
        </div>
      </div>
      <section className="sectionimage">
        <div className="px-4 py-adjust px-md-5 text-center text-lg-start">
          <div className="container">
            <div className="row gx-lg-5 align-items-center down">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <h1 className="my-4 h1 display-6  ls-tight">
                  Welcome to the Transporter NoteBook Digital ERP System
                </h1>
                <h4 className="divider h4 ls-tight">
                  Facilitating Transport, Enabling Growth
                </h4>
                <p className="p">
                  Economic growth critically depends on efficient transportation
                  systems. TNB makes all the data and processes in multiple
                  branches across India, completely digital, safe, and
                  accessible from anywhere
                </p>
              </div>

              <div className="col-lg-6 mb-5 mb-lg-0 form">
                <div className="card">
                  <div className="card-body py-5 px-md-5">
                    <form>
                      <div className="row">
                        <p style={{ textAlign: "center" }}>
                          <img
                            src={jsmt}
                            alt="Transporter NoteBook"
                            width="80%"
                          />
                        </p>
                        <div className="wrap-input">
                          <input
                            ref={emailRef}
                            type="email"
                            className="input100 input"
                            name="username"
                            placeholder="Username or Email ID"
                            required
                            onChange={inputChangeHandler}
                          />
                          <span className="focus-input100"></span>
                          <span className="symbol-input100">
                            <i className="fa fa-user"></i>
                          </span>
                        </div>
                        <div className="wrap-input">
                          <input
                            ref={ref}
                            type="password"
                            className="input100 input"
                            name="password"
                            placeholder="Password"
                            id="tnbpass"
                            required
                            onChange={inputChangeHandler}
                          />
                          <span className="focus-input100"></span>
                          <span className="symbol-input100">
                            <i className="fa fa-lock"></i>
                          </span>
                          <span>
                            <i
                              id="toggler"
                              className="fa-regular fa-eye-slash"
                              onClick={toggle}
                            ></i>
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-12 buttonform">
                        <div className="text-center">
                          <button
                            type="submit"
                            className="btn button btn-primary btn-block mb-4 formbutton"
                            onClick={submitHandler}
                          >
                            LOGIN
                          </button>
                        </div>
                      </div>
                      {/* <div className="row">
                        <div className="col-lg-6">
                          <p
                            style={{
                              textAlign: "left",
                              color: "black",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <input
                              type="checkbox"
                              name="checkbox"
                              id="checkbox"
                              className="input"
                            />
                            <label
                              htmlFor="remember_me"
                              style={{ paddingLeft: "5px" }}
                            >
                              Remember me
                            </label>
                          </p>
                        </div>
                        <div className="col-lg-6">
                          <p style={{ textAlign: "right" }}>
                            <a href="#">Forgot Password?</a>
                          </p>
                        </div>
                      </div> */}
                      {httpError !== "" && (
                        <Stack
                          sx={{
                            width: "100%",
                            margin: "0 0 30px 0",
                            border: "1px solid red",
                            borderRadius: "4px",
                          }}
                          spacing={2}
                        >
                          <Alert severity="error">{httpError}</Alert>
                        </Stack>
                      )}
                    </form>
                  </div>
                </div>
              </div>
              {/* <div className="col-lg-6"></div>
              <div className="col-lg-6 mb-5 mb-lg-0 form signup">
                <div className="card signup">
                  <form action="">
                    <a
                      className="btn btn-primary btn-lg btn-block signupbtn"
                      href="#!"
                      role="button"
                    >
                      Sign Up
                    </a>
                  </form>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
      <section style={{ padding: "10px" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-4 alignCenter">
              <img src={web} alt="Transporter NoteBook Website" height="50%" />{" "}
              &nbsp;
              <a
                href="https://transporternotebook.com/"
                target="_blank"
                rel="noreferrer"
              >
                Transporter Note Book
              </a>
            </div>
            <div className="col-lg-4 alignCenter">
              Powered by{" "}
              <a
                href="https://www.vspace.co.in/"
                target="_blank"
                rel="noreferrer"
              >
                vspace.in
              </a>{" "}
              software
            </div>
            <div className="col-lg-4 alignCenter">
              Email <a href="mailto:tnb@vspace.in">tnb@vspae.in</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
