import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  email as EmailIcon,
  eyeClose as PasswordHide,
  eyeOpen as PasswordShow,
  lock as LockIcon,
} from "../assets/imageExport";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    email: {
      invalid: "Email is mandatory and valid.",
    },
    password: {
      incorrect: "please enter correct Password",
    },
  });

  const [passwordValid, setPasswordValid] = useState({
    length: false,
    number: false,
    lowercase: false,
    uppercase: false,
    special: false,
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
        console.log("matched", emailRegex.test(emailValidation));
        setEmailError(() => "valid");
      } else {
        console.log("not matched", emailRegex.test(emailValidation));
        setEmailError(() => "invalid");
      }
      return emailValidation; // return the updated value
    });
  };

  const validatePasswordRegex = (e) => {
    console.log("triggred");
    const passwordValidation = e.target.value;

    const passwordRegex = {
      length: /^.{8}/,
      number: /[0-9]/,
      lowercase: /[a-z]/,
      uppercase: /[A-Z]/,
      special: /[#?!@$%^&*-]/,
    };

    const updatePasswordValidation = {
      length: passwordRegex.length.test(passwordValidation),
      number: passwordRegex.number.test(passwordValidation),
      lowercase: passwordRegex.lowercase.test(passwordValidation),
      uppercase: passwordRegex.uppercase.test(passwordValidation),
      special: passwordRegex.special.test(passwordValidation),
    };

    setPasswordValid(() => updatePasswordValidation);
    console.log(passwordValid, "passwordValid");
    // validatePassword();
    // setPassword(() => passwordValidation);
  };

  const validatePassword = (e) => {
    const allPropertiesTrue = Object.values(passwordValid).every(
      (value) => value === true
    );
    console.log("here");

    setPasswordError(() => {
      if (password === confirmPassword && allPropertiesTrue) {
        return "";
      } else {
        return "error";
      }
    });

    // if (password === confirmPassword && allPropertiesTrue) {
    //   console.log(password === confirmPassword, allPropertiesTrue, "inside");
    //   setPasswordError("");
    // } else {
    //   setPasswordError("error");
    //   console.log(password === confirmPassword, allPropertiesTrue, "outside");
    // }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (emailError === "valid" && passwordError === "error") {
      navigate("/mainpage")
    }
  };

  useEffect(() => {
    console.log(emailError, "useEffect");
  }, [
    logged,
    emailError,
    passwordError,
    confirmPassword,
    passwordValid,
    validatePassword,
  ]);
  return (
    <div className="w-[900px]  flex justify-center items-strech  rounded-xl  overflow-hidden text-center ">
      <div className="bg_body absolute"></div>

      <div className=" sign_in  w-3/6 px-5 p-5 flex flex-col bg-slate-100 gap-5 rounded-md">
        <form
          id="login_form"
          onSubmit={handleSubmit}
          className="flex flex-col gap-10 w-auto"
        >
          <header className="text-5xl ">
            <h1>Registration</h1>
          </header>

          <div>
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
                {emailError === ""
                  ? ""
                  : emailError === "valid"
                  ? ""
                  : errorMessage.email.invalid}
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
                  onChange={(e) => {
                    setPassword(() => e.target.value);
                    validatePasswordRegex(e);
                  }}
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
              <small className="password_message_criteria text-start text-red-500 ">
                <p className="text-sm">Your Password should:</p>
                <ul className="requirement-list">
                  <li>
                    <span
                      className={`${
                        passwordValid.length ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      be atlease 8 characters long.
                    </span>
                  </li>
                  <li>
                    <span
                      className={`${
                        passwordValid.number ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      contain atleast 1 number (0...9)
                    </span>
                  </li>
                  <li>
                    <span
                      className={`${
                        passwordValid.lowercase
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      contain atleast 1 lowercase letter (a...z)
                    </span>
                  </li>
                  <li>
                    <span
                      className={`${
                        passwordValid.uppercase
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      Should contain atleast 1 uppercase letter (A...Z)
                    </span>
                  </li>
                  <li>
                    <span
                      className={`${
                        passwordValid.special
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      contain atleast 1 special symbol (!...$)
                    </span>
                  </li>
                </ul>
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
                  onChange={(e) => {
                    setConfirmPassword(() => e.target.value);
                    validatePassword(e),
                      console.log(e.target.value, "confirmPass");
                  }}
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
              <small className="password_message_criteria text-start text-red-500 ">
                {passwordError.length === 0
                  ? ""
                  : passwordError === "error"
                  ? "password should Match"
                  : ""}
              </small>
            </div>
          </div>

          <button
            type="submit"
            className="button outline rounded ring-2 ring-blue-400 w-2/6 text-lg mx-auto relative outline-none overflow-hidden z-0  "
          >
            Register Now
          </button>
        </form>

        <p className="sign-up">
          Have an account?
          <Link
            to="/"
            className="text-blue-400 hover:text-purple-800 font-semibold"
          >
            {" "}
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};
export default SignUp;
