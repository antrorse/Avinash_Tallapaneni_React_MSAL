import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import MailIcon from "../components/icons/MailIcon";
import PasswordHide from "../components/icons/PasswordHide";
import PasswordShow from "../components/icons/PasswordShow";
import Lock from "../components/icons/Lock";
import Correct from "../components/icons/Correct";
import Wrong from "../components/icons/Wrong";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const errorMessage = {
    email: "please enter valid Email",
    confirmPassword: "please enter same Password",
  };
  const [error, setError] = useState({
    email: false,
    confirmPassword: false,
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const [passwordValid, setPasswordValid] = useState({
    length: false,
    number: false,
    lowercase: false,
    uppercase: false,
    special: false,
  });

  const navigate = useNavigate();

  const validateEmail = (e) => {
    const emailValidation = e.target.value;
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const testEmail = emailRegex.test(emailValidation);
    setError((prev) => ({ ...prev, email: testEmail }));
  };

  const validatePasswordRegex = (e) => {
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
      (value) => value
    );

    const passwordValidAndSame =
      allPropertiesTrue && password === confirmPassword;

    setError((prev) => ({ ...prev, confirmPassword: passwordValidAndSame }));

    // setPasswordError(() => {
    //   if (password === confirmPassword && allPropertiesTrue) {
    //     return "";
    //   } else {
    //     return "error";
    //   }
    // });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (error.email && error.confirmPassword) {
      navigate("/mainpage");
    }
  };

  // useEffect(() => {
  //   validatePassword();
  //   // setEmailError(() => "");
  // }, [
  //   emailError,
  //   passwordError,
  //   confirmPassword,
  //   passwordValid,
  //   validatePassword,
  // ]);

  useEffect(() => {
    validatePassword();
  }, [confirmPassword]);

  return (
    <div className="w-[900px] h-[500px] bg_background flex justify-start items-start relative">
      <div className="bg_foreground w-full h-full absolute"></div>

      <div className="pl-10  text-slate-100 z-10 flex flex-col gap-3 justify-center pt-10">
        <form
          action=""
          className="flex flex-col gap-5 p-2"
          onSubmit={handleSubmit}
        >
          <header className="text-5xl ">
            <p>Registration</p>
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
            <small className="error_message">
              {email.length === 0 || error.email ? "" : errorMessage.email}
            </small>
          </div>

          <div className="flex flex-col gap-2 items-start ">
            <div className={`flex gap-2 border-b-2 w-full items-center`}>
              <Lock fill="white" width={20} height={20} />

              <input
                id="password"
                className="w-full text-lg"
                aria-label="password"
                type={showPassword.password ? "text" : "password"}
                placeholder="Enter your Password"
                autoComplete="off"
                onChange={(e) => {
                  setPassword(e.target.value);
                  validatePasswordRegex(e);
                }}
              />

              <div
                className="cursor-pointer"
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    password: !showPassword.password,
                  }))
                }
              >
                {showPassword.password ? (
                  <PasswordShow fill="white" width={20} height={20} />
                ) : (
                  <PasswordHide fill="white" width={20} height={20} />
                )}
              </div>
            </div>
            <small className="password_message_criteria text-start  flex flex-col gap-1 ">
              <p className="text-xs">Your Password should:</p>
              <ul className="requirement-list">
                <li>
                  <span
                    className={` flex items-center gap-1  ${
                      passwordValid.length ? "valid" : "invalid"
                    }`}
                  >
                    {passwordValid.length ? (
                      <Correct width={10} height={10} />
                    ) : (
                      <Wrong width={10} height={10} />
                    )}
                    be atlease 8 characters long.
                  </span>
                </li>
                <li>
                  <span
                    className={` flex items-center gap-1 ${
                      passwordValid.number ? "valid" : "invalid"
                    }`}
                  >
                    {passwordValid.number ? (
                      <Correct width={10} height={10} />
                    ) : (
                      <Wrong width={10} height={10} />
                    )}
                    contain atleast 1 number (0...9)
                  </span>
                </li>
                <li>
                  <span
                    className={` flex items-center gap-1 ${
                      passwordValid.lowercase ? "valid" : "invalid"
                    }`}
                  >
                    {passwordValid.lowercase ? (
                      <Correct width={10} height={10} />
                    ) : (
                      <Wrong width={10} height={10} />
                    )}
                    contain atleast 1 lowercase letter (a...z)
                  </span>
                </li>
                <li>
                  <span
                    className={` flex items-center gap-1 ${
                      passwordValid.uppercase ? "valid" : "invalid"
                    }`}
                  >
                    {passwordValid.uppercase ? (
                      <Correct width={10} height={10} />
                    ) : (
                      <Wrong width={10} height={10} />
                    )}
                    Should contain atleast 1 uppercase letter (A...Z)
                  </span>
                </li>
                <li>
                  <span
                    className={` flex items-center gap-1 ${
                      passwordValid.special ? "valid" : "invalid"
                    }`}
                  >
                    {passwordValid.special ? (
                      <Correct width={10} height={10} />
                    ) : (
                      <Wrong width={10} height={10} />
                    )}
                    contain atleast 1 special symbol (!...$)
                  </span>
                </li>
              </ul>
            </small>
          </div>
          <div className="flex flex-col gap-1 items-start ">
            <div className={`flex gap-2 border-b-2 w-full items-center`}>
              <Lock fill="white" width={20} height={20} />

              <input
                id="password"
                className="w-full text-lg"
                aria-label="password"
                type={showPassword.confirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                autoComplete="off"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  validatePassword(e);
                }}
              />

              <div
                className="cursor-pointer"
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    confirmPassword: !showPassword.confirmPassword,
                  }))
                }
              >
                {showPassword.confirmPassword ? (
                  <PasswordShow fill="white" width={20} height={20} />
                ) : (
                  <PasswordHide fill="white" width={20} height={20} />
                )}
              </div>
            </div>
            <small className="password_message_criteria text-start ">
              {error.confirmPassword ? "" : <p>Your password should match</p>}
            </small>
          </div>

          <button
            type="submit"
            className="button outline rounded ring-2 ring-white w-2/6 text-lg mx-auto relative outline-none overflow-hidden z-0  "
          >
            Sign Up
          </button>
        </form>
        <p className="text-md ">
          Don't have an account?
          <Link
            to="/"
            className=" sign-up font-semibold hover:text-red-300 text-slate-100 text-xl"
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
