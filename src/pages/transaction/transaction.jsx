import React from "react";
import { BiSearch } from 'react-icons/bi'
import "./transaction.css";
import axios from "axios";
import { Component } from "react";



const accessToken = localStorage.getItem("token");
const apiUrl = "http://localhost:8085/api/v1";




const authAxios = axios.create({
    baseURL : apiUrl,
    headers : {
        Authorization : `Bearer ${accessToken}`,
        "Content-Type": "*"
    }
})


class Transaction extends Component {

    constructor(){
        super();
        this.state = {
            history : [],
        };
    }

    async componentDidMount(){


            try{
                const result = await authAxios.get(`/transactionHistory`);
            
            
                const historyList = result.data.result.content;
                console.log(historyList);
                this.setState({history : historyList});
                console.log(this.state.history);
               
            
    
            }catch(err){
               
                console.log(err.message);
            };

    }

    

    render(){

       const classes = (money)=> money === "DEBIT" ? "money-two" : "money";
      

    return (<div className="transaction-container">
        <div className="search-transaction">
            <div className="search-i">
            <span><BiSearch className="search-icon"/></span>
            </div>
          <input type="text" className="search" placeholder="Search transactions" />
        </div>

        <div className="t-history">
            <h6>Transaction history</h6>
        </div>

        <div className="list-of-history">
            {this.state.history.reverse().map(hist => 
                <div key={hist.id} className="first-element">
                   <div className="icon">
                       
                   </div>
   
                   <div className="history-name">
                       <h6 className="owner-name">{hist.name}</h6>
                       <div>
                           <h6 className="bank">{hist.bank} &nbsp; &nbsp; &nbsp; <br />{hist.transactionTime}</h6>
                       </div>
                   </div>
   
                   <div className={classes(hist.type)}>
                    {hist.amount.slice(1)}
                   </div>
   
               </div>
                
                
                
                )}
         

        </div>



    </div>) }
}


export default Transaction;