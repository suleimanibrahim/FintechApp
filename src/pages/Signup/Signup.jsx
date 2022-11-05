import "./signup.css";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import EmailVerification from "../emailverification/EmailVerification";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../../api/axios";

const FIRSTNAME_REGEX = /^[a-zA-Z]{3,23}$/;
const LASTNAME_REGEX = /^[a-zA-Z]{3,23}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9.]+@+[a-zA-Z0-9]+.+[A-z]/;
const PHONENUMBER_REGEX = /^[0-9]+/;
const BVN_REGEX = /^[0-9]+/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@$%]).{8,24}$/;
const PIN_REGEX = /^[0-9a-z]+/i;

const REGISTER_URL = "/register";


export default function Signup() {
  return (
    <>
      <div className="signup-container-fluid">
        <div className="signup-background row">
          <div className="col signup-left">
            <div className="signup-left-side">
              <SignupForm />
            </div>
          </div>

          <div className="right-side-div col-7">
            <div className="signup-right-side-img"></div>
          </div>
        </div>
      </div>
    </>
  );
}


function SignupForm() {
  let userIcon = "👤";
  let passwordIcon = "🔒";
  let emailIcon = "📨";
  let phoneNumberIcon = "☏";

  const errRef = useRef();

  const [firstName, setFirstName] = useState("");
  const [validFirstName, setValidFirstName] = useState(false);
  const [firstNameFocus, setFirstNameFocus] = useState(false);

  const [lastName, setLastName] = useState("");
  const [validLastName, setValidLastName] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [validPhoneNumber, setValidPhoneNumber] = useState(false);
  const [phoneNumberFocus, setPhoneNumberFocus] = useState(false);

  const [bvn, setBVN] = useState("");
  const [validBVN, setValidBVN] = useState(false);
  const [bvnFocus, setBVNFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [pin, setPIN] = useState("");
  const [validPIN, setValidPIN] = useState(false);
  const [pinFocus, setPINFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const result = FIRSTNAME_REGEX.test(firstName);
    setValidFirstName(result);
  }, [firstName]);

  useEffect(() => {
    const result = LASTNAME_REGEX.test(lastName);
    setValidLastName(result);
  }, [lastName]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PHONENUMBER_REGEX.test(phoneNumber);
    setValidPhoneNumber(result);
  }, [phoneNumber]);

  useEffect(() => {
    const result = BVN_REGEX.test(bvn);
    setValidBVN(result);
  }, [bvn]);

  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    setValidPassword(result);
    const match = password === confirmPassword;
    setValidMatch(match);
  }, [password, confirmPassword]);

  useEffect(() => {
    const result = PIN_REGEX.test(pin);
    setValidPIN(result);
  }, [pin]);

  useEffect(() => {
    setErrMsg("");
  }, [
    firstName,
    lastName,
    email,
    phoneNumber,
    bvn,
    password,
    confirmPassword,
    pin,
  ]);

  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const v1 = FIRSTNAME_REGEX.test(firstName);
    const v2 = LASTNAME_REGEX.test(lastName);
    const v3 = EMAIL_REGEX.test(email);
    const v4 = PHONENUMBER_REGEX.test(phoneNumber) && (phoneNumber.length===11);
    const v5 = BVN_REGEX.test(bvn) && (bvn.length===11);
    const v6 = PASSWORD_REGEX.test(password);
    const v7 = PIN_REGEX.test(pin) && (pin.length)===4;

    if (!v1){
      setErrMsg("Invalid Firstname");
    }else if(!v2){
      setErrMsg("Invalid Lastname");
    }else if(!v3){
      setErrMsg("Invalid Email");
    }else if(!v4){
      setErrMsg("Invalid Phonenumber");
    }else if(!v5){
      setErrMsg("Invalid BVN");
    }else if(!v6){
      setErrMsg("Invalid Password");
    }else if(!v7){
      setErrMsg("Invalid PIN");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        ({
          firstName,
          lastName,
          email,
          phoneNumber,
          bvn,
          password,
          confirmPassword,
          pin,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));

      setSuccess(true);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhoneNumber("");
      setBVN("");
      setPassword("");
      setConfirmPassword("");
      setPIN("");
    } catch (err) {
      // alert(JSON.stringify(err))
      if (!err?.response) {
        setErrMsg("Server Timedout");
      } else if (err.response?.status >= 400 && err.response?.status < 409) {
        setErrMsg("User already exists");
      } 
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <EmailVerification/>
        
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>

          <div className="signup-form-container">
            <div className="signup-header-name-msg">
              <p className="signup-header-name">Fintech.africa</p>
              <p className="signup-header-msg">Get Started with Fintech</p>
            </div>
            <form onSubmit={handleSubmit}>
              <FormItem
                icon={userIcon}
                name="First Name"
                placeHolder="Enter your first name"
                type="text"
                autoComplete="off"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                required
                aria-invalid={validFirstName ? "false" : "true"}
                aria-describedby="firstnamenote"
                onFocus={() => setFirstNameFocus(true)}
                onBlur={() => setFirstNameFocus(false)}
              />

              <p
                id="firstnamenote"
                className={
                  firstNameFocus && firstName && !validFirstName
                    ? "instructions"
                    : "offscreen"
                }
              ></p>
              <FormItem
                icon={userIcon}
                name="Last Name"
                placeHolder="Enter your last name"
                type="text"
                autoComplete="off"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                required
                aria-invalid={validLastName ? "false" : "true"}
                aria-describedby="lastnamenote"
                onFocus={() => setLastNameFocus(true)}
                onBlur={() => setLastNameFocus(false)}
              />
              <p
                id="lastnamenote"
                className={
                  lastNameFocus && lastName && !validLastName
                    ? "instructions"
                    : "offscreen"
                }
              ></p>

              <FormItem
                icon={emailIcon}
                name="Email"
                placeHolder="Enter your email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby="emailnote"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
              <p
                id="emailnote"
                className={
                  emailFocus && email && !validEmail
                    ? "instructions"
                    : "offscreen"
                }
              >
          
              </p>

              <FormItem
                icon={phoneNumberIcon}
                name="Phone Number"
                placeHolder="Enter phone number"
                type="text"
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
                required
                aria-invalid={validPhoneNumber ? "false" : "true"}
                aria-describedby="phonenumbernote"
                onFocus={() => setPhoneNumberFocus(true)}
                onBlur={() => setPhoneNumberFocus(false)}
              />
              <p
                id="phonenumbernote"
                className={
                  phoneNumberFocus && !validPhoneNumber
                    ? "instructions"
                    : "offscreen"
                }
              >
              </p>

              <FormItem
                icon=""
                name="BVN"
                placeHolder="Enter BVN"
                type="number"
                onChange={(e) => setBVN(e.target.value)}
                value={bvn}
                aria-invalid={validBVN ? "false" : "true"}
                aria-describedby="bvnnote"
                onFocus={() => setBVNFocus(true)}
                onBlur={() => setBVNFocus(false)}
              />
              <p
                id="bvnnote"
                className={bvnFocus && !validBVN ? "instructions" : "offscreen"}
              >
            
              </p>

              <FormItem
                icon={passwordIcon}
                name="Password"
                placeHolder="Enter your password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                aria-invalid={validPassword ? "false" : "true"}
                aria-describedby="passwordnote"
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
              />
              <p
                id="passwordnote"
                className={
                  passwordFocus && !validPassword ? "instructions" : "offscreen"
                }
              >
              </p>

              <FormItem
                icon={passwordIcon}
                name="Confirm Password"
                placeHolder="Confirm password"
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
              <p
                id="confirmnote"
                className={
                  matchFocus && !validMatch ? "instructions" : "offscreen"
                }
              >
              </p>

              <FormItem
                icon=""
                name="Pin"
                placeHolder="Enter transaction pin"
                type="text"
                onChange={(e) => setPIN(e.target.value)}
                value={pin}
                required
                aria-invalid={validPIN ? "false" : "true"}
                aria-describedby="pinnote"
                onFocus={() => setPINFocus(true)}
                onBlur={() => setPINFocus(false)}
              />
              <p
                id="pinnote"
                className={pinFocus && !validPIN ? "instructions" : "offscreen"}
              ></p>

              <div className="signup-button">
                <button
                  type="submit"
                  disabled={
                    !validFirstName ||
                    !validLastName ||
                    !validEmail ||
                    !validPhoneNumber ||
                    !validBVN ||
                    !validPassword ||
                    !validMatch ||
                    !validPIN
                      ? true
                      : false
                  }
                  className="signup-btn"
                >
                  {" "}
                  Sign Up
                </button>
              </div>
            </form>

            <div className="signup-login">
              Already have an account?{" "}
              <Link to="/login">
                <span className="singup-login-span">Login</span>
              </Link>{" "}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function FormItem(props) {
  return (
    <div className="form-group form-item">
      <label className="form-item" htmlFor={props.name}>
        {props.name}
      </label>
      <input
        type={props.type}
        className="form-control"
        id={props.name}
        placeholder={props.icon + "   " + props.placeHolder}
        onChange={props.onChange}
        onFocus={props.onFocus}
        onBlur={props.onBlur}

      />
    </div>
  );
}
