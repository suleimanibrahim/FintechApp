import React from "react";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { Link } from "react-router-dom";
import "./emailver.css";

const PasswordResetVerification = () => {
  return (
    <>
      <div className="verification-card">
        <div className="card-content">
          <span>
            <MdOutlineMarkEmailRead className="sentEmail-icon" />
          </span>
          <div>
            <h4 className="verification-header">Check your mail</h4>
            <p className="verification-text verify-text">
              We sent a password reset link to your email. <br />
              Please clikc the link to reset your password
            </p>

            <p className="reset-paragraph-txt">
              Don’t receive the email?{" "}
              <Link to="/forgot-password" className="reset-paragraph-txt">
                Click to Resend link
              </Link>{" "}
            </p>
            <Link to="/login">
              <button className="reset-verify-btn">Login</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordResetVerification;
