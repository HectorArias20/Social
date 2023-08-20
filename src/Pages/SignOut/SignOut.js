import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../context/UserContext';

export default function SignOut() {
    const navigate = useNavigate();
    const { currentUser,activeUser} = useContext(UserContext);
    const logout =()=>{
        activeUser(null)
    navigate("/")
    }
    logout()
}
