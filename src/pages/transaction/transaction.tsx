import React, { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import "./transaction.css";
import axios from "axios";

const accessToken = localStorage.getItem("token");
const apiUrl = "http://localhost:8085/api/v1";

const authAxios = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "*",
  },
});

const Transaction = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await authAxios.get(`/transactionHistory`);
        const historyList = result.data.result.content;
        setHistory(historyList);
        console.log(historyList);
      } catch (err: any) {
        console.log(err.message);
      }
    };

    fetchData();
  }, []);

  const classes = (money: any) => (money === "DEBIT" ? "money-two" : "money");

  return (
    <div className="transaction-container">
      <div className="search-transaction">
        <div className="search-i">
          <span>
            <BiSearch className="search-icon" />
          </span>
        </div>
        <input
          type="text"
          className="search"
          placeholder="Search transactions"
        />
      </div>

      <div className="t-history">
        <h6>Transaction history</h6>
      </div>

      <div className="list-of-history">
        {history.reverse().map((hist: any) => (
          <div key={hist.id} className="first-element">
            <div className="icon"></div>
            <div className="history-name">
              <h6 className="owner-name">{hist.name}</h6>
              <div>
                <h6 className="bank">
                  {hist.bank} &nbsp; &nbsp; &nbsp; <br />
                  {hist.transactionTime}
                </h6>
              </div>
            </div>
            <div className={classes(hist.type)}>{hist?.amount?.slice(1)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transaction;
