import "./login.css";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';


import {
	Alert,

} from "react-bootstrap";

// const apiUrl = "http://localhost:8085/api/v1/reset-Password";

const BASEURL = process.env.REACT_APP_BACKEND_URI;


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
                        <div className="reset-login-right-side-img"></div>
                    </div>
                </div>
            </div>
        </>
    );
}

function LoginForm() {
    let passwordIcon = "🔒";

    const [newPassword, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");

    const [message, setMessage] = useState("")
    
    
    const navigate = useNavigate();

    const handleOnResetSubmit = async (e) => {
        e.preventDefault();
     
        
        try {
        
            const body = {
                newPassword: newPassword,
                confirmPassword: confirmPassword,
                
              };

              const params = new URLSearchParams(window.location.search);
              
              const headers = {
                "Content-Type": "application/json",
                
              };
              const {data} = await axios.post(`${BASEURL}/api/v1/reset-Password`, body, {headers: headers, params: params});

              if(data.status === "BAD_REQUEST"){
                setMessage("Password Do not Match");
                swal("Error", message, "error");
               }
            else{
                swal("Password Reset Successfully!!!", { appearance: "success"});
                navigate("/login");
            }
            
                  
         
        } catch (error) {
          console.log(error.message);
        }
        
      };

      const handlePassword = (e) => {
        const value = e.target.value;
    
        setPassword(value);
      };

      const handleConfirmPassword = (e) => {

        const value = e.target.value;
        setconfirmPassword(value);
        

      };
     



    return (
        <>
            <div className="login-form-container">
                <div className="login-header-name-msg">
                    <p className="login-header-msg">Reset Password</p>
                </div>
               <div>
               {message && (
						<Alert variant={"danger"}>
							{message}
						</Alert>
					)}
                </div>
                 <form method="post" onSubmit={(e) => handleOnResetSubmit(e)}>
                <FormItem
                    icon={passwordIcon}
                    name="New Password"
                    placeHolder="Enter New  Password"
                    type="password"
                    value={newPassword}
                    onChange={handlePassword}
                />
                <FormItem
                    icon={passwordIcon}
                    name="Confirm Password"
                    placeHolder="Confirm Your Password"
                    type="password"
                    value={confirmPassword}
                    onChange={handleConfirmPassword}
                />
               
                <div className="login-button">
                    <button type="submit" className="login-btn">
                        Reset password
                    </button>
                </div>
                <div></div>
                </form>
            </div>
        </>
    );
}

function FormItem(props) {
    return (
        <div className="form-group form-item">
            <label className="login-form-item" htmlFor={props.name}>
                {props.name}
            </label>
            <input
                type={props.type}
                className="form-control login-form-control"
                id={props.name}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.icon + "   " + props.placeHolder}
            />
        </div>
    );
}
