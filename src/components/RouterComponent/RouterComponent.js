import React, { useContext } from "react";
import { Navigate, Route, Routes } from 'react-router-dom'
import { UserContext } from "../../context/UserContext";
import { Container } from "../Login/Login.styled";
import LoginComponent from "../Login/LoginComponent";
import VerificationComponent from "../Login/VerificationComponent";
import LoginBlock from "../Login/LoginBlock";
import MenuComponent from "../MenuComponent/MenuComponent";
import SidenavComponent from '../SidenavComponent/SidenavComponent';
import TimeTables from "../../Pages/TimeTables/TimeTables";
import Home from "../../Pages/Home/Home";
import Settings from "../../Pages/Settings/Settings";
import '../../App.css'
import Posts from "../../Pages/Posts/Posts";
import SignOut from "../../Pages/SignOut/SignOut";
import { createTheme } from "@material-ui/core";


const mode = "login";
const RouterComponent = () => {
  const { currentUser } = useContext(UserContext);
  console.log(currentUser);
  if (currentUser != null) {
    return (
      <div className="App">
      <SidenavComponent/>
      <main className="main">
      <Routes>
        
        <Route  path="/" element={<Home />}/>
        <Route path="/timetables" element={<TimeTables />} />
        <Route path="/posts" element={<Posts />}/>
        <Route path="/settings" element={<Settings />} />
        <Route path="/signout" element={<SignOut />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </main>
     
    </div>
    )
  } else {
    return(
        <Routes>
         <Route path="/" element={<LoginComponent mode={mode}/>}/>
         <Route path="/verify/:user" element={<VerificationComponent/>} />
        <Route path="*" element={<Navigate to="/" replace />} />
       </Routes>)
   
  }
};

export default RouterComponent;
