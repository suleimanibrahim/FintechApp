import React from "react";
import "./emailver.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";

import { Alert } from "react-bootstrap";

const BASEURL = process.env.REACT_APP_BACKEND_URI;
// const apiUrl = "http://localhost:8085/api/v1/forgot-Password";

const EmailVerification = () => {
  let emailIcon = "📨";

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleOnResetSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const body = {
        email: email,
      };

      const headers: any = {
        "Content-Type": "application/json",
      };

      const { data } = await axios.post(
        `${BASEURL}/api/v1/forgot-Password`,
        body,
        headers
      );

      if (data.status === "NOT_FOUND") {
        setMessage("Email Not Found");
        swal("Error", message, "error");
      } else {
        navigate("/password-reset-verification");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnchange = (e: any) => {
    const value = e.target.value;

    setEmail(value);
  };

  return (
    <>
      <div className="verification-cards">
        <div className="card-content">
          <div className="verification">
            <h4 className="verification-header">Forget Password</h4>
            <p className="verification-text">
              Enter the email associated with your account and we’ll send an
              email with instruction to reset your password
            </p>
            {/* {message && <label className="label">{message}</label>}  */}

            <form autoComplete="off" onSubmit={(e) => handleOnResetSubmit(e)}>
              <FormItem
                icon={emailIcon}
                placeHolder="Enter your email"
                type="email"
                value={email}
                onChange={handleOnchange}
                required
              />
              <div className="reset-password-button">
                <button type="submit" className="reset-password-btn">
                  Reset password
                </button>
              </div>
              <div></div>
            </form>

            <button type="submit" className="reset-login">
              <Link to="/login" className="reset-login-link">
                Back to Login
              </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

function FormItem(props: any) {
  return (
    <div className="form-group form-item">
      <label className="verify-email-form-item" htmlFor={props.name}>
        {props.name}
      </label>
      <input
        type={props.type}
        className="form-control verify-email-input"
        id={props.name}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.icon + "   " + props.placeHolder}
      />
    </div>
  );
}

export default EmailVerification;
