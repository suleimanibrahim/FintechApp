import React from 'react'
import Walletcard from './dashboardcomponents/Walletcard/Walletcard'
import Navbar from './Navbar/Navbar'
import Transaction from '../transaction/transaction';


const Dashboard = () => {
    return (

        <>
            <Navbar/>
            <Walletcard/>
            <Transaction />
        </>
    )
}

export default Dashboard