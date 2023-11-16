import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  email as EmailIcon,
  eyeClose as PasswordHide,
  eyeOpen as PasswordShow,
  lock as LockIcon,
} from "../assets/imageExport";
// import {ReactComponent as EmailIcon} from "../assets/envelope-solid.svg";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    email: {
      invalid: "Please enter valid Email",
      incorrect: "please enter correct Email",
    },
    password: {
      incorrect: "please enter correct Password",
    },
  });
  const [showCredentials, setshowCredentials] = useState(false);
  const [logged, setLogged] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const Credentials = {
    email: "avinash_tallapaneni@twitter.com",
    password: "Password123",
  };

  const validateEmail = (e) => {
    const emailValidation = e.target.value;

    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    setEmail(() => {
      if (emailRegex.test(emailValidation)) {
        setEmailError(() => "valid");
      } else {
        setEmailError(() => "invalid");
      }
      return emailValidation; // return the updated value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === Credentials.email && password === Credentials.password) {
      console.log("working");
      setLogged(true);
    } else {
      if (email !== Credentials.email) {
        setEmailError(() => "incorrect");
      } else {
        setEmailError(() => "");
      }

      if (password !== Credentials.password) {
        setPasswordError(() => "incorrect");
      } else {
        setPasswordError(() => "");
      }

      setLogged(false);
    }
  };

  useEffect(() => {
    logged ? navigate("/signup") : navigate("/");
  }, [logged, errorMessage]);

  return (
    <div className="w-[900px]  flex justify-center items-strech  rounded-xl  overflow-hidden text-center ">
      <div className="bg_body absolute"></div>

      {/* <div className="w-3/6 LeftSideImage ">
        <img src={LeftSideImage} alt="Left Side Image" />
      </div> */}

      <div className=" sign_in  w-3/6 px-5 p-5 flex flex-col bg-slate-100 gap-5 rounded-md">
        <form
          id="login_form"
          onSubmit={handleSubmit}
          className="flex flex-col gap-10 w-auto"
        >
          <header className="text-5xl ">
            <h1>Sign In</h1>
          </header>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1 items-start ">
              <div
                className={`flex items-center justify-start gap-2 text-lg ring-1 ${
                  emailError === ""
                    ? "ring-blue-400"
                    : emailError === "invalid" || emailError === "incorrect"
                    ? "ring-red-400"
                    : "ring-green-400"
                } px-1 rounded w-full`}
              >
                <img src={EmailIcon} alt="" width={20} height={20} />
                {/* <EmailIcon fill="red" /> */}

                <input
                  id="email"
                  className="w-full text-lg"
                  aria-label="email"
                  // type="email"
                  placeholder="Enter your Email"
                  autoComplete="off"
                  onChange={(e) => validateEmail(e)}
                  // value={email}
                />
              </div>
              <small className="error_message text-red-500">
                {emailError === "" || emailError === "valid"
                  ? ""
                  : emailError === "invalid"
                  ? errorMessage.email.invalid
                  : errorMessage.email.incorrect}
              </small>
            </div>
            <div className="flex flex-col gap-1 items-start ">
              <div
                className={`flex items-center justify-start gap-2 text-lg ring-1 ${
                  passwordError === "incorrect"
                    ? "ring-red-400"
                    : "ring-blue-400"
                } px-1 rounded w-full`}
              >
                <img src={LockIcon} alt="" width={20} height={20} />
                <input
                  id="password"
                  className="w-full text-lg"
                  aria-label="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your Password"
                  autoComplete="off"
                  onChange={(e) => setPassword(e.target.value)}
                  //   value={email}
                />
                <img
                  src={showPassword ? PasswordShow : PasswordHide}
                  alt=""
                  width={20}
                  height={20}
                  className="cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              </div>
              <small className="error_message text-start text-red-500">
                {passwordError === "incorrect"
                  ? errorMessage.password.incorrect
                  : " "}
              </small>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-center">
                <input type="checkbox" id="remember-me" />
                <label htmlFor="remember-me"> Remember me</label>
              </div>

              <div
                className="text-blue-500 hover:text-purple-800 text-sm font-semibold cursor-pointer"
                onClick={() => setshowCredentials((prev) => !prev)}
              >
                Forgot Password? (<span className="text-xs">Credentials</span>)
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
              className="button outline rounded ring-2 ring-blue-400 w-2/6 text-lg mx-auto relative outline-none overflow-hidden z-0  "
            >
              Login Now
            </button>
          </div>
        </form>

        <p className="sign-up">
          Don't have an account?
          <Link
            to="/signup"
            className="text-blue-400 hover:text-purple-800 font-semibold"
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
