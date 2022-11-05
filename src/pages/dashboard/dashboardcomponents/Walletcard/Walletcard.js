import React, { useState, useEffect } from 'react';
import './walletcard.css';
import { IoWalletOutline } from 'react-icons/io5';
import { MdOutlineContentCopy } from 'react-icons/md';
import { AiOutlineEye } from 'react-icons/ai';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import {Link} from 'react-router-dom';
import axios from 'axios'; 



const apiUrl = "http://localhost:8085/api/v1";
const accessToken = localStorage.getItem("token");
 
const authAxios = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "*",
  },
});



const Walletcard = () => {
    const [show, setShow] = useState(false);
    const [balance, setBalance] = useState('****');
    const [wallet, setWallet]= useState([]);

    const hideBalance = () => {
        setBalance('****');
        setShow((prevState) => !prevState)

    }

   useEffect(() => {
     loadUser();
   }, []);

    const loadUser = async () => {
      try {
        const result = await authAxios.get(`/viewWalletDetails`);
        console.log(result.data);
        setWallet(result.data);
        console.log(wallet);
      } catch (err) {
        console.log(err.message);
      }

    
    };
	

    let dollarUS = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "NGN",
    });


    

    
    const showBalance = () => {
        setBalance(dollarUS.format(wallet.balance));
        setShow((prevState) => !prevState)

    }

    return (
        <>
            <section className='walletcase'>
                <div className='boxcontain'>
                    <div className='contains'>
                        <div className='walleticon'>
                    <span>
                        <IoWalletOutline className='io'/>
                    </span>
                        </div>
                        <div className='digits'>
                            <p>Account Balance</p>
                            <p className='balance'><b>{balance}</b></p>
                            <p className='wema'>{wallet.bankName}</p>
                            <p>
                                <button className='copyBtn'>
                            <span>
                            <MdOutlineContentCopy/>
                        </span>
                                </button>

                                {wallet.accountNumber} 
                            </p>
                        </div>
                    </div>
                    <div className='showBal'>
                        {
                            !show ? (
                                <button className='show' onClick={showBalance}>
                            <span>
                            <AiOutlineEye className='showIcon'/>
                            </span>
                                </button>
                            ) : (
                                <button className='hide' onClick={hideBalance}>
                            <span>
                                <AiOutlineEyeInvisible className='hideIcon'/>
                            </span>

                                </button>
                            )
                        }


                    </div>
                </div>
                <div className='nextdiv'>
                    <div className='trans'>
                        <Link to="/local-transfer">Transfer</Link>
                    </div>
                    <div className='prof'>
                        <Link to="/profile">Profile</Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Walletcard