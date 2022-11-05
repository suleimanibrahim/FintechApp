import './login.css';
import React from 'react'
import {Link} from 'react-router-dom'
import { useState } from 'react';
import { toast } from 'react-hot-toast'


export default function Login() {
    return (
        <>
            <div className='login-container-fluid'>
                <div className='login-background row'>

                    <div className='col login-left'>
                        <div className='login-left-side'>
                            <LoginForm/>
                        </div>
                    </div>

                    <div className='right-side-div col-7'>
                        <div className='login-right-side-img'></div>
                    </div>
                </div>
            </div>

        </>

    )
}

function LoginForm() {
    let passwordIcon = '🔒';
    let emailIcon = '📨';

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const sendLoginRequest = async () => {
        const reqBody = {
            email: username,
            password: password,
        };

        try {
            const response = await fetch("http://localhost:8085/api/v1/login", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "post", 
                body: JSON.stringify(reqBody)
            })

            const {token} = await response.json()
            localStorage.setItem("token", token);

            console.log(response);

           if(response.status === 200) {
                if(localStorage.getItem("token") === "Please verify your account from your email"){
                    toast.error("Please verify your account");
                    
                } else {
                    window.location.href = "dashboard"
                    toast.success("Successful Login");
                }
                
            }
            toast.error("invalid Login")
            console.log(response);
           

    } catch (error) {
        error = "Something went wrong! Check your network setting"
        toast.error(error);
    }
}


    return (
        <>
            <div className='login-form-container'>
                <div className='login-header-name-msg'>
                    <p className='login-header-name'>Fintech.africa</p>
                    <p className='login-header-msg'>Hi, Welcome Back</p>
                </div>


                <FormItem icon={emailIcon} name="Email" placeHolder="Enter your email" type = "email" value={username} onChange={(e) => setUsername(e.target.value)} />
                <FormItem icon={passwordIcon} name="Password" placeHolder="Enter your password" type = "password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <div><Link to='/forgot-password'>Forgot password?</Link></div>
                <div className='login-button'><button type='submit' className='login-btn' onClick={() => sendLoginRequest()}>Login</button></div>
                <div className='login'>Don't have an account? <Link to="/signup"><span className ='login-span'>Create account</span></Link> </div>
            </div>
        </>
    )
}

function FormItem(props) {
    return (

        <div className="form-group login-form-item">
            <label className='login-form-item' htmlFor={props.name}>{props.name}</label>
            <input onChange={props.onChange} value={props.value} type={props.type} className="form-control login-form-control" id={props.name}  placeholder={props.icon + "   " + props.placeHolder}/>
        </div>

    )
}
