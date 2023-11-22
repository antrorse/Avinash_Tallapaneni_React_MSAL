import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import MailIcon from "../components/icons/MailIcon";
import PasswordHide from "../components/icons/PasswordHide";
import PasswordShow from "../components/icons/PasswordShow";
import Lock from "../components/icons/Lock";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const errorMessage = {
    email: "please enter valid Email",
    password: "please enter correct Password",
  };

  const [error, setError] = useState({
    email: false,
    password: false,
  });

  const [showCredentials, setshowCredentials] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const Credentials = {
    email: "avinash_tallapaneni@twitter.com",
    password: "Password123",
  };
  const navigate = useNavigate();

  const [loginClicked, setLoginClicked] = useState(false);

  const validateEmail = (e) => {
    const emailValidation = e.target.value;
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const testEmail = emailRegex.test(emailValidation);
    setError((prev) => ({ ...prev, email: testEmail }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoginClicked(true);

    if (email === Credentials.email && password === Credentials.password) {
      console.log("working");
      navigate("/mainpage");
    } else {
      setError((prev) => ({
        ...prev,
        email: email === Credentials.email,
        password: password === Credentials.password,
      }));
    }
  };

  useEffect(() => {
    console.log(error);
  }, []);

  return (
    <div className="w-[900px] h-[500px] bg_background flex justify-start items-start  relative">
      <div className="bg_foreground w-full h-full absolute"></div>

      <div className="pl-10 text-slate-100 z-10 flex flex-col gap-10 justify-center pt-10">
        <form
          action=""
          className="flex flex-col gap-5 p-2"
          onSubmit={handleSubmit}
        >
          <header className="text-5xl  ">
            <p>Sign In</p>
          </header>

          <div className="flex flex-col gap-1 items-start ">
            <div className={"flex gap-2 border-b-2 w-full items-center"}>
              <MailIcon fill="white" width={20} height={20} />

              <input
                id="email"
                className="w-full text-lg"
                aria-label="email"
                placeholder="Enter your Email"
                autoComplete="off"
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateEmail(e);
                }}
              />
            </div>
            <small className="error_message text-red-500">
              {loginClicked && email.length === 0
                ? errorMessage.email
                : email.length === 0 || error.email
                ? ""
                : errorMessage.email}
            </small>
          </div>

          <div className="flex flex-col gap-1 items-start ">
            <div className={`flex gap-2 border-b-2 w-full items-center`}>
              <Lock fill="white" width={20} height={20} />

              <input
                id="password"
                className="w-full text-lg"
                aria-label="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your Password"
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
              />

              <div
                className="cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <PasswordShow fill="white" width={20} height={20} />
                ) : (
                  <PasswordHide fill="white" width={20} height={20} />
                )}
              </div>
            </div>
            <small className="error_message text-start text-red-500">
              {loginClicked
                ? !error.password
                  ? errorMessage.password
                  : ""
                : ""}
            </small>
          </div>

          <div className="flex items-center justify-between gap-5">
            <div className="flex items-center justify-center text-lg gap-1">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me"> Remember me</label>
            </div>

            <div
              className=" hover:text-red-300 text-sm font-semibold cursor-pointer"
              onClick={() => setshowCredentials((prev) => !prev)}
            >
              Forgot Password? (
              <span className="text-xs">Demo Credentials</span>)
            </div>
          </div>
          {showCredentials ? (
            <div className=" text-xs font-semibold text-start ">
              {Object.entries(Credentials).map((credit, value) => {
                return (
                  <div className="flex" key={value}>
                    <span style={{ textTransform: "capitalize" }}>
                      {credit[0]}
                    </span>
                    <span>{`: ${credit[1]}`}</span>
                    <br />
                  </div>
                );
              })}
            </div>
          ) : (
            ""
          )}
          <button
            type="submit"
            className="button outline rounded ring-2 ring-white w-2/6 text-lg mx-auto relative outline-none overflow-hidden z-0  "
          >
            Login Now
          </button>
        </form>
        <p className=" text-md ">
          Don't have an account?
          <Link
            to="/signup"
            className=" sign-up font-semibold hover:text-red-300 text-slate-100 text-xl"
          >
            {" "}
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
