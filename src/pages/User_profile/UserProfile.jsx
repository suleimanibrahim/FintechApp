import React, {useState, useEffect} from "react";
import Navbar from "../dashboard/Navbar/Navbar";
import { BsArrowLeft} from 'react-icons/bs';
import { Link } from "react-router-dom";
import "./userprofile.css";
import axios from 'axios';
 
 
const apiUrl = "http://localhost:8085/api/v1";
const accessToken = localStorage.getItem("token");
 
const authAxios = axios.create({
   baseURL : apiUrl,
   headers : {
       Authorization : `Bearer ${accessToken}`,
       "Content-Type" : "*"
   }
});
 
export default function UserProfile(){
 
   const [userProfile, setUserProfile] = useState([]);
   useEffect(()=>{
       loadUser();
   },[]);
    const loadUser = async ()=>{
       try{
           const result = await authAxios.get(`/viewUser`);
       console.log(result.data);
       setUserProfile(result.data);
       }catch(err){
           console.log(err.message);
        
       }
   }
 
   return (
       <>
           <Navbar/>
           <div className="user--profile_body">
               <div className="previous-page">
               <span>
                   <BsArrowLeft />
               </span>
                   <Link to='/dashboard' className="goBack">Go back</Link>
                   <button className="fund--wallet"><Link to="/fund-wallet" className="fund--wallet-text">Fund Wallet </Link></button>
               </div>
               <h4 className="user--profile_header">PROFILE</h4>
               <div className="form--body">
                   <form className="form">
                       <label htmlFor="" className="form--header">First Name
                           <input type="text" disabled className="form--input" name="firstname" value={userProfile.firstName} placeholder="First name"/>
                       </label>
                   </form>
 
                   <form className="form">
                       <label htmlFor="" className="form--header">Last Name
                           <input type="text" disabled className="form--input" name="lastname" value={userProfile.lastName} placeholder="Last name"/>
                       </label>
                   </form>
 
                   <form className="form">
                       <label htmlFor="" className="form--header">Phone Number
                           <input type="text" disabled className="form--input" name="phone" value={userProfile.phoneNumber} placeholder="Phone number"/>
                       </label>
                   </form>
 
                   <form className="form">
                       <label htmlFor="" className="form--header">BVN
                           <input type="text" disabled className="form--input" name="bvn" value={userProfile.bvn} placeholder="BVN"/>
                       </label>
                   </form>
 
                   <form className="form">
                       <label htmlFor="" className="form--header">Email
                           <input type="text" disabled className="form--input" name="email" value={userProfile.email} placeholder="Email"/>
                       </label>
                   </form>
 
                   <button disabled className="form--input form--btn">Done</button>
               </div>
 
 
           </div>
       </>
 
   )
}

