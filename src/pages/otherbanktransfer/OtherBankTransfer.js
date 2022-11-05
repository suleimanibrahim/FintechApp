
import React, { useState, useRef, useEffect } from 'react'
import './Other_bank_transfer.css';
import Navbar from '../dashboard/Navbar/Navbar';
import { BsArrowLeft} from 'react-icons/bs';
import { Link, useNavigate } from "react-router-dom";

const axios = require("axios");

const token = "Bearer " + localStorage.getItem("token");

const BASE_URL = "http://localhost:8085/api/v1";
const RESOLVE_ACCOUNT = "/transfer/otherbank-account-query";
const GET_BANKS = "/transfer/banks";
const OTHER_BANK_TRANSFER = "/transfer/other-bank"

const BankTransfer = () => {
    let [selectBank, setBank] = useState("Select bank");
    let [allBanks, setAllBanks] = useState([]);
    let [bankCode, setBankCode] = useState("");
    let [message, setMessage] = useState("");
    let [modal, setModal] = useState("close-modal");
    let [successButton, setSuccessButton] = useState("close-modal")
    let [isHidden, setIsHidden] = useState(true);
    let [receiverName, setReceiverName] = useState("");

    let navigate = useNavigate();

    let accountNumberRef = useRef(0);
    let amountRef = useRef(0);
    let pinRef = useRef(0);
    let narrationRef = useRef(0);
    let receiverNameRef = useRef(0);

    useEffect(() => {
        (async ()=> {
            const config = {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json'
                }
            }

            try {
                const value = await axios.get(BASE_URL + GET_BANKS, config);
                const { data } = value;
                setAllBanks([...data])
            } catch (error) {
                const { response } = error;
                if (response.status === 400) {
                    setMessage(response.data.message);
                    setModal("modal-content");
                }
            }
        })();
    }, [])

    const resolveReceiver = async (e) => {
        let accountNumber = accountNumberRef.current.value.trim();
        let bankCode = e.target.value.trim();
        setBankCode(bankCode);

        if (accountNumber.length === 0) {
            alert("Please input a valid number");
            return;
        }

        const body = {
            account_number: accountNumber,
            account_bank: bankCode
        }

        const config = {
            headers: {
                 Authorization: token,
                'Content-Type': 'application/json'
            }
        }

        try {
            const value = await axios.post(BASE_URL + RESOLVE_ACCOUNT, body, config);
            const { data } = value.data;
            setReceiverName(data.account_name);
            setIsHidden(false);
        } catch (error) {
            setMessage("Please confirm account number or/and bank");
            setModal("modal-content");
        }
    };

    function handleSubmit(e) {
        e.preventDefault();
        let accountNumber = accountNumberRef.current.value.trim();
        let amount = amountRef.current.value;
        let pin = pinRef.current.value.trim();
        let narration = narrationRef.current.value.trim();
        let accountName = receiverNameRef.current.value.trim();

        (async ()=> {
            const body = {
                accountNumber: accountNumber,
                bankCode: bankCode,
                accountName: accountName,
                amount: amount,
                pin: pin,
                narration: narration
            }

            const config = {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json'
                }
            }

            try {
                const value = await axios.post(BASE_URL + OTHER_BANK_TRANSFER, body, config);
                console.log(value);
                setSuccessButton("transfer-success");
            } catch (error) {
                const { response } = error;
                if (response.status === 400) {
                    setMessage(response.data.message);
                    setModal("modal-content");
                }
            }
        })();
    }

    function handleModal() {
        setModal("close-modal");
    }

    function transferSuccess() {
        navigate("/dashboard");
    }


    return (
        <>
            <Navbar />
            <div className="local--transfer-previous-page">
                <span>
                     <BsArrowLeft />
                </span>
                <Link to='/dashboard' className="local--transfer-goBack">Go back</Link>
            </div>


            <div className="other--transfer-container">
                <h5 className="transfer">TRANSFER</h5>
            </div>

            <div className="other--transfer-links">
                <p> <Link to="/local-transfer" className="local">Local Transfer</Link></p>
                <p><a className="other" href="#">Other Bank Transfer</a><hr className='hr'/></p>
            </div>

            <div className="other--transfer-formWrapper">
                <div className="other--transfer-formContainer">
                    <form onSubmit={handleSubmit}>
                        <label className="other-label">Account Number</label> <br />
                        <input type="text" placeholder="Account number" className="other--transfer-input" ref={accountNumberRef}/>
                        <label className="other-label">Select Bank</label> <br />
                        <div className='select'>
                            <select className="bank" onChange={resolveReceiver}  name="select-bank">
                                <option>{selectBank}</option>
                                {
                                    allBanks.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1).map(bank => <option key={bank.code} value={bank.code}>{bank.name}</option>)
                                }
                            </select>
                        </div>

                        <label className="other-label" hidden={isHidden}>Account Name</label> <br />
                        <input type="text" ref = {receiverNameRef} className="other--transfer-input" value={receiverName} hidden={isHidden} disabled/>

                        <label className="other-label">Amount</label> <br />
                        <input type="text" placeholder="Amount" className="other--transfer-input" ref={amountRef}/>
                        <label className="other-label">Pin</label>
                        <input type="text" placeholder="Pin" className="other--transfer-input" ref={pinRef}/>
                        <label className="other-label" >Narration</label>

                        <textarea placeholder="message" ref={narrationRef}></textarea>

                        <div className="btnContainer"><button type="submit" className="transferBtn">Send Money</button></div>
                    </form>

                </div>
            </div>

            <div id={successButton}>
                <p>Transfer successful</p>
                <button onClick={ transferSuccess } id = "transfer-success-button">Ok</button>
            </div>

            <Modal handleModal = { handleModal } message = { message } modal = { modal }/>
        </>
    )
}


const Modal = (props)=> {
    return (
        <>
            <div id={props.modal} >
                <p>{ props.message }</p>
                <button id="close" onClick = {props.handleModal} > Close </button>
            </div>
        </>
    )
}

export default BankTransfer;