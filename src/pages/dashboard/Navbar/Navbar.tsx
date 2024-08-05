import React, { Component, useState, useEffect } from 'react';
import {Nav, NavLink, StackLink, NameLink} from './NavbarElements'
import { Stack, Badge, Avatar } from "@mui/material"
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import './navbar.css';
import axios from "axios";

// const token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJvYmVtZXVjaGVjaGlAZ21haWwuY29tIiwiZXhwIjoxNjYxOTAyMjAzLCJpYXQiOjE2NjE4OTg2MDN9.C6GuB0qXsM11VCW9iE-UGQqu4Xsfgke3pZ2Cheo5awg"
const Navbar = () => {
    const token = "Bearer " + localStorage.getItem("token");

    let [username, setUsername] = useState("");

        const displayName = async ()=> {
            const config = {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json'
                }
            }
            try {
                await axios.get("http://localhost:8085/api/v1/getUserName", config).then(res=> setUsername(res.data.result));
            } catch (error) {

            }
        };

    useEffect(() => {
        displayName();
    }, [])


    return (
        <>
            <Nav>
                <NavLink to ="/dashboard">
                    <p className='text'>Fintech.africa</p>
                </NavLink>

                <div className='notification-profile_container'>
                    <StackLink to ="/notifications">
                        <Stack>
                            <Badge badgeContent={1} color='error'>
                                <NotificationsNoneIcon/>
                            </Badge>
                        </Stack>
                    </StackLink>

                    <NameLink to ="/profile">
                        <Avatar alt="Adetutu" src="" />
                        <h5 className ='name'>{username}</h5>
                    </NameLink>
                </div>

            </Nav>
        </>
    )
}

export default Navbar