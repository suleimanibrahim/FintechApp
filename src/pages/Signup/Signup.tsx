import "./signup.css";
import React from "react";
import { Link } from "react-router-dom";
import { FormikProvider, useFormik } from "formik";
import AccountableFormField from "../../components/common/accountableInputs/AccountableInputs";
import Button from "../../components/common/button/Button";
import * as Yup from "yup";
import { useSignUpMutation } from "../../api/useauth";
import toast from "react-hot-toast";

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
  const signUpMutation = useSignUpMutation();

  const handleSubmitter = async (values: any) => {
    signUpMutation.mutate(values, {
      async onSuccess(res) {
        toast.success("Register successfully");
        window.location.href = "dashboard";
      },
      onError(error: any) {
        toast.error(error || "Failed due to an unexpected error.");
      },
    });
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      bvn: "",
      password: "",
      confirmPassword: "",
      pin: "",
    },
    onSubmit: handleSubmitter,

    validationSchema: Yup.object({
      firstName: Yup.string()
        .required("First Name is required")
        .matches(
          /^[A-Za-z\s]+$/,
          "First Name must contain only letters and spaces"
        ),
      lastName: Yup.string()
        .required("Last Name is required")
        .matches(/^[A-Za-z\s]+$/, "Last Name must contain only letters"),
      email: Yup.string()
        .required("Email address is required")
        .email("Invalid email address")
        .required(),
      phoneNumber: Yup.string()
        .required("Phone number is required")
        .matches(/^\d+$/, "Phone number must be digits only")
        .min(11, "Phone number must be 11 digits long"),
      bvn: Yup.string()
        .required("BVN is required")
        .matches(/^\d+$/, "BVN must be a number")
        .min(11, "BVN must be 11 digits long"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be 8 characters long")
        .matches(/[0-9]/, "Password requires a number")
        .matches(/[^\w]/, "Password requires a symbol"),
      confirmPassword: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("password")], "Passwords must match"),
      pin: Yup.string()
        .required("Pin is required")
        .matches(/^\d+$/, "Pin must be a number")
        .min(4, "Pin must be at least 4 digits long")
        .max(4, "Pin must be at most 4 digits long"),
    }),
  });

  const { handleSubmit } = formik;

  const allValid = Object.values(formik.values).every(Boolean);

  return (
    <>
      {/* {success ? (
        <EmailVerification />
      ) : ( */}
      <section>
        <div className="signup-form-container">
          <div className="signup-header-name-msg">
            <p className="signup-header-name">Fintech.africa</p>
            <p className="signup-header-msg">Get Started with Fintech</p>
          </div>
          <FormikProvider value={formik}>
            <form onSubmit={handleSubmit}>
              <div className="signup-container">
                <AccountableFormField
                  label="First Name"
                  name="firstName"
                  icon={userIcon}
                  placeholder="Enter your first name"
                />
                <AccountableFormField
                  label="Last Name"
                  name="lastName"
                  icon={userIcon}
                  placeholder="Enter your last name"
                />
                <AccountableFormField
                  label="Email"
                  name="email"
                  icon={emailIcon}
                  placeholder="Enter your email address"
                />
                <AccountableFormField
                  label="Phone Number"
                  name="phoneNumber"
                  icon={phoneNumberIcon}
                  placeholder="Enter phone number"
                />
                <AccountableFormField
                  label="BVN"
                  name="bvn"
                  icon={userIcon}
                  placeholder="Enter BVN"
                />
                <AccountableFormField
                  name="password"
                  label="Password"
                  icon={passwordIcon}
                  componentName="password"
                  placeholder="Enter Password"
                />
                <AccountableFormField
                  name="confirmPassword"
                  label="Confirm Password"
                  icon={passwordIcon}
                  componentName="password"
                  placeholder="Enter confirm Password"
                />
                <AccountableFormField
                  name="pin"
                  label="Transaction Pin"
                  icon={passwordIcon}
                  componentName="password"
                  placeholder="Enter your pin"
                />
              </div>
              <div className="signup-button">
                <Button
                  isLoading={signUpMutation?.isLoading}
                  type="submit"
                  disabled={!allValid || signUpMutation?.isLoading}
                >
                  Sign Up
                </Button>
              </div>
            </form>
          </FormikProvider>

          <div className="signup-login">
            Already have an account?{" "}
            <Link to="/login">
              <span className="singup-login-span">Login</span>
            </Link>{" "}
          </div>
        </div>
      </section>
      {/* )} */}
    </>
  );
}
