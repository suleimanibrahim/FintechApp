import "./login.css";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import Button from "../../components/common/button/Button";
import { useLoginMutation } from "../../api/useauth";
import * as Yup from "yup";
import { FormikProvider, useFormik } from "formik";
import AccountableFormField from "../../components/common/accountableInputs/AccountableInputs";

export default function Login() {
  return (
    <>
      <div className="login-container-fluid">
        <div className="login-background row">
          <div className="col login-left">
            <div className="login-left-side">
              <LoginForm />
            </div>
          </div>

          <div className="right-side-div col-7">
            <div className="login-right-side-img"></div>
          </div>
        </div>
      </div>
    </>
  );
}

function LoginForm() {
  let passwordIcon = "🔒";
  let emailIcon = "📨";

  const loginMutation = useLoginMutation();

  const handleSubmitter = async (values: any) => {
    loginMutation.mutate(values, {
      async onSuccess(res) {
        toast.success("You have logged in successfully");
        const { token } = await res.json();
        localStorage.setItem("token", token);
        window.location.href = "dashboard";
      },
      onError(error: any) {
        toast.error(error || "Login failed due to an unexpected error.");
      },
    });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleSubmitter,

    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email address is required")
        .email("Invalid email address")
        .required(),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be 8 characters long")
        .matches(/[0-9]/, "Password requires a number")
        .matches(/[^\w]/, "Password requires a symbol"),
    }),
  });

  const { handleSubmit } = formik;

  const allValid = Object.values(formik.values).every(Boolean);

  return (
    <>
      <div className="login-form-container">
        <div className="login-header-name-msg">
          <p className="login-header-name">Fintech.africa</p>
          <p className="login-header-msg">Hi, Welcome Back</p>
        </div>
        <FormikProvider value={formik}>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <AccountableFormField
                label="Email address"
                name="email"
                icon={emailIcon}
                placeholder="e.g yourname@gmail.com"
              />
              <AccountableFormField
                name="password"
                label="Password"
                icon={passwordIcon}
                componentName="password"
                placeholder="**********"
              />
            </div>
            <div>
              <Link to="/forgot-password">Forgot password?</Link>
            </div>
            <div className="login-button">
              <Button
                isLoading={loginMutation?.isLoading}
                type="submit"
                disabled={!allValid || loginMutation?.isLoading}
              >
                Login
              </Button>
            </div>
          </form>
        </FormikProvider>
        <div className="login">
          Don't have an account?{" "}
          <Link to="/signup">
            <span className="login-span">Create account</span>
          </Link>{" "}
        </div>
      </div>
    </>
  );
}
