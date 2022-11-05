import React, { useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../dashboard/Navbar/Navbar";
import { BsArrowLeft} from 'react-icons/bs';
import "./fundwallet.css";
import axios from "axios";
import swal from "sweetalert";

// const token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJvYmVtZXVjaGVjaGlAZ21haWwuY29tIiwiZXhwIjoxNjYxOTQwMjc5LCJpYXQiOjE2NjE5MzY2Nzl9.PvXiM-aE168ZlIRhXpRpSl4LVwyfww92XwATVKMRXzA"
    export default function FundWallet () {
    const token = "Bearer " + localStorage.getItem("token");
    console.log("from fund wallet " + token);
    let submitRef = useRef(0);

    const handleFunding = function (e) {
        e.preventDefault();
        const amount = submitRef.current.value;

            (async ()=> {
                const config = {
                    headers: {
                        Authorization: token,
                        'Content-Type': 'application/json'
                    }
                }
                try {
                    const response = await axios.post("http://localhost:8085/api/v1/fundLocalWallet", {amount: amount}, config);
                    await swal("Funding successful!", { appearance: "success"}).then(function() { window.location = "/dashboard"; });

                } catch (error) {
                    console.log(error);
                    await swal("Invalid amount", {appearance: "error"});
                }
            })();

    }


    return(
        <>
        <Navbar />
            <div className="fund--wallet-body">
                <div className="previous-page">
               <span>
                   <BsArrowLeft />
               </span>
                    <Link to='/profile' className="goBack">Go back</Link>
                </div>
                <h4 className="fund--wallet-header">FUND WALLET</h4>
                <div className="fund--wallet-form-body">
                    <form className="fund--wallet-form" onSubmit={handleFunding}>
                        <input type="text" className="fund--wallet-input" name="amount" placeholder="Amount" ref={submitRef}/>
                        <div className="fund--wallet-btn-container">
                            <button type="submit" className="fund--wallet-btn">Fund Wallet</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
